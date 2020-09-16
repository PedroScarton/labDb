const getDb = require('../util/database').getDb;

class User {
  constructor(nickName, name, profileImageURL, description, phone, id) {
    this.nickName = nickName;
    this.name = name;
    this.profileImageURL = profileImageURL;
    this.description = description;
    this.phone = phone;
    this._id =  id ? new mongodb.ObjectId(id) : null;
  }

  save() {
    const db = getDb();
    let dbOp;
    if(this._id) {
      dbOp = db.collection('users').updateOne({_id: this._id}, {$set: this});
    } else {
      dbOp = db.collection('users').insertOne(this);
    }
    return dbOp
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('users').find().toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err)
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('users').find({ _id: new mongodb.ObjectId(prodId) }).next()
      .then(product => {
        return product;
      })
      .catch(err => {
        console.log(err)
      })
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('users').deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => {
        console.log(err);
      })
  }
}

module.exports = User;