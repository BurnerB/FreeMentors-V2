import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

const { expect } = chai;
chai.should();
chai.use(chaiHttp);

describe('AUTH',()=>{
    describe('/post signup',()=>{
        it('should successfully sign up a user',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoe@email.com",
                    password:"password123",
                    address:"Nairobi Kenya",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(201);
                    expect(res).to.be.an('object');
                    expect(res).to.include(data);
                    expect(res).to.have.property("message","User created succeffully");
                    if (err) return done();
                    done();
            });
        });

        it('should check if the email has already been used to register',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoe@email.com",
                    password:"password123",
                    address:"Nairobi Kenya",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(409);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('The email has already been used to register');
                    if (err) return done();
                    done();
            });
        });

        it('should check if the email is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi Kenya",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Email is a required field and must be valid');
                    if (err) return done();
                    done();
            });
        });

        it('should check if the firstname is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John123",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi Kenya",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Firstname is a required field with a min of 3 chars and no special chars or numbers');
                    if (err) return done();
                    done();
            });
        });

        it('should check if the lastname is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe123",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi Kenya",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Lastname is a required field with a min of 3 chars and no special chars or numbers');
                    if (err) return done();
                    done();
            });
        });

        it('should check if the password is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password1231",
                    address:"Nairobi Kenya",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Password is a required field with a min of 5 chars and no special chars');
                    if (err) return done();
                    done();
            });
        });

        it('should check if the address is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi @3#$",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Address is a required field with a min of 5 chars and no special chars');
                    if (err) return done();
                    done();
            });
        });

        it('should check if the bio is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi @3#$",
                    bio:" ",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Bio is a required field');
                    if (err) return done();
                    done();
            });
        });

        it('should check if occupation is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi @3#$",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:" ",
                    expertise:"rapping",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Occupation is a reqiuired field');
                    if (err) return done();
                    done();
            });
        });

        it('should check expertice is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi @3#$",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:" ",
                    is_Mentor:false,
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('Expertice is a required field');
                    if (err) return done();
                    done();
            });
        });

        it('should check if the is_Mentor is valid',(done)=>{
            chai.request(app)
                .post('api/v1/auth/signup')
                .send({
                    firstName:"John",
                    lastName:"Doe",
                    email:"johndoeemail.com",
                    password:"password123",
                    address:"Nairobi @3#$",
                    bio:"rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century",
                    occupation:"Musician",
                    expertise:"rapping",
                    is_Mentor:'maybe',
                })
                .end((err,res)=>{
                    res.should.have.status(400);
                    expect(res).to.be.an('object');
                    expect(res.body).to.have.property('status');
                    expect(res.body.error).equals('is_Agent is a required field and can only be true or false');
                    if (err) return done();
                    done();
            });
        });

        

        

        
    })
})