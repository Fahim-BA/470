import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['jobSeeker', 'employer', 'admin'],
        default: 'jobSeeker'
    },
    profile: {
        firstName: {
            type: String,
            trim: true,
            maxlength: 50
        },
        lastName: {
            type: String,
            trim: true,
            maxlength: 50
        },
        contactNumber: {
            type: String,
            trim: true,
            // match: [/^+?(\d{10,14})$/, 'Please fill a valid phone number'] //need to fix this regex
        },
        location: {
            type: String,
            maxlength: 100
        },
        resume: {
            type: String,
            default: null
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

UserSchema.statics.getUsersWithRole = async function(role) {
    return this.find({ role });
};

// Add methods or statics if needed
UserSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

const userModel = mongoose.model('User', UserSchema);
export default userModel;