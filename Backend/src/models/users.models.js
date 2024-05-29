import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    userName: {
        type: 'String',
        required: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: 'String',
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: 'String',
        required: true,
    },
    mobileNo: {
        type: 'String',
        required: true,
    },
    Imageurl: {
        type: 'String',
    },
    refreshToken: {
        type: 'String',
    }
}, {
    timestamps: true,
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName
        },
        process.env.Access_Token_Secret,
        {
            expiresIn: process.env.Access_Token_Expiry
        }
    )
}
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.Refresh_Token_Secret,
        {
            expiresIn: process.env.Refresh_Token_Expiry
        }
    )
}

export const User = mongoose.model("users", UserSchema);