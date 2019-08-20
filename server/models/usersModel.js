
const db = [];

class UserModel{
    constructor(firstName,lastName,email,password,address,bio,occupation,expertise){
        this.userId = db.length +1;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.bio = bio;
        this.occupation = occupation;
        this.expertise = expertise;
        this.is_Mentor = false;
        this.is_Admin = false;
    }

    async registerUser(){
        const user = {
            userId : this.id,
            firstName:this.firstName,
            lastName:this.lastName,
            email:this.email,
            password:this.password,
            address:this.address,
            bio:this.bio,
            occupation:this.occupation,
            expertise:this.expertise,
            is_Mentor:this.is_Mentor,
            is_Admin:this.is_Admin,
        };
        const obj = db.find(o => o.email === this.email);
        if(!obj){
            db.push(user);
            return true;
        }
        return false;
    }
}

export default  UserModel;