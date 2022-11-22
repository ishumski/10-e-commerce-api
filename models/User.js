const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please, provide username'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'Please, provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please, provide valid email'
        }
    },
    password: {
        type: String,
        require: [true, 'Please, provide password'],
        minLength: 6
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)