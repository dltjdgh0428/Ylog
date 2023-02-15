import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const imageSchema = new mongoose.Schema({
    width: Number,
    height: Number,
});

const UserSchema = new Schema({
    username: String,
    age: Number,
    phonenumber: String,
    hashedPassword: String,
    image: imageSchema,
});

UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password,10);
    this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function(password){
    const result = await bcrypt.compare(password,this.hashedPassword);
    return result;
};

UserSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
};

UserSchema.statics.findByUsername = function(username){
    return this.findOne({username});
};

UserSchema.methods.generateToken = function(){
    const token = jwt.sign(
        {
            _id: this.id,
            username:this.username,
        },
        // eslint-disable-next-line no-undef
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        },
    );
    return token;
};

const User = mongoose.model('User',UserSchema);
export default User;