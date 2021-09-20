var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('https://thinking-tester-contact-list.herokuapp.com');

describe('User', function () {

    var responseBody;
    var token ;
    var invalidToken = "invalidToken";

    before(function (done) {

        api.post('/users')
            .set('Accept', 'application/json')
            .send({
                firstName: "fstname",
                lastName: "lstname",
                email: "api-test-email2@yopmail.com",
                password: "test-password"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                responseBody = JSON.stringify(res.body);
                console.log("responseBody "+responseBody)
                token = responseBody.token;
            });
    });

    //1. Validate firstName,lastName and email fields value returned by Fetch User api is same as provided while adding a user.
    it('Validate firstName,lastName and email fields value returned by Fetch User api is same as provided while adding a user. 2. Validate that no field has value as undefined or empty value.',
        function (done) {
            api.get('/users/me')
                .set('Accept', 'application/json')
                .set('Authorization', 'Bearer ' + token)
                .expect(200)
                .end(function (err, res) {
                    //validate firstName
                    expect(res.body).to.have.property("firstName");
                    expect(res.body.firstName).to.not.equal(null);
                    expect(res.body.firstName).to.not.equal(undefined);
                    expect(res.body.firstName.length).to.not.equal(0);
                    expect(res.body.firstName).to.equal('fstname');

                    //validate lastName
                    expect(res.body).to.have.property("lastName");
                    expect(res.body.lastName).to.not.equal(null);
                    expect(res.body.lastName).to.not.equal(undefined);
                    expect(res.body.lastName.length).to.not.equal(0);
                    expect(res.body.lastName).to.equal('lstname');

                    //validate email
                    expect(res.body).to.have.property("email");
                    expect(res.body.email).to.not.equal(null);
                    expect(res.body.email).to.not.equal(undefined);
                    expect(res.body.email.length).to.not.equal(0);
                    expect(res.body.email).to.equal('api-test-email2@yopmail.com');

                    done();
                });
        });

    //3. Validate user is not able to fetch user details with invalid token.
    it('Validate user is not able to fetch user details with invalid token.', function (done) {
        api.get('/users/me')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + invalidToken)
            .expect(401, done)
    });

    //4. Validate contact is added successfully using Add Contact API. Also, validate the response values for each field is correct.
    it('Validate contact is added successfully using Add Contact API. Also, validate the response values for each field is correct.', function (done) {
        api.post('/contacts')
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer ' + token)
            .send({
                firstName: "Akshay",
                lastName: "Sharma",
                birthDate: "12/3/1992",
                email: "sharma.daisy56@gmail.com",
                phone: "8976876576",
                street1: "Abc",
                street2: "XYZ",
                city: "HYD",
                stateProvince: "AP",
                postalCode: "876543",
                country: "INDIA"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                responseBody = JSON.stringify(res.body);
                console.log("responseBody "+responseBody)
                //validate firstName
                expect(res.body).to.have.property("firstName");
                expect(res.body.firstName).to.equal('Akshay');

                //validate lastName
                expect(res.body).to.have.property("lastName");
                expect(res.body.lastName).to.equal('Sharma');

                //validate email
                expect(res.body).to.have.property("email");
                expect(res.body.email).to.equal('sharma.daisy56@gmail.com');

                //validate phone
                expect(res.body).to.have.property("phone");
                expect(res.body.phone).to.equal('8976876576');

                //validate street1
                expect(res.body).to.have.property("street1");
                expect(res.body.street1).to.equal('Abc');

                //validate street2
                expect(res.body).to.have.property("street2");
                expect(res.body.street2).to.equal('XYZ');

                //validate city
                expect(res.body).to.have.property("city");
                expect(res.body.city).to.equal('HYD');

                //validate stateProvince
                expect(res.body).to.have.property("stateProvince");
                expect(res.body.stateProvince).to.equal('AP');

                //validate postalCode
                expect(res.body).to.have.property("postalCode");
                expect(res.body.postalCode).to.equal('876543');

                //validate country
                expect(res.body).to.have.property("country");
                expect(res.body.country).to.equal('INDIA');

                //validate _id
                expect(res.body).to.have.property("_id");
                expect(res.body._id).to.not.equal(null);
                contactID = res.body._id;

                done();
            });
    });

    // 5. Validate contact is deleted successfully using Delete Contact API. 
    it('Validate contact is deleted successfully using Delete Contact API.', function (done) {
        api.delete('/contacts/'+contactID)
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end(function (err, res) {
                done();
            });
    });

    //6. Validate Get Contact API returns error while fetching the deleted contact.
    it('Validate Get Contact API returns error while fetching the deleted contact.', function (done) {
        api.get('/contacts/'+contactID)
            .set('Authorization', 'Bearer ' + token)
            .expect(404, done());
    });
});