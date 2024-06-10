/*2. In case of the user’s document make sure a user must have to provide his/her name, password,and email.*/

db.runCommand({collMod: "users", 
    validator: {
    $jsonSchema: {
    required: [ "name", "email", "password" ],
    properties: {
    name: {
    bsonType: "string",
    description: "name␣string␣required"
    },
    email: {
    bsonType: "string",
    pattern: "^.+\@.+$",
    description: "valid␣email␣required"
    },
    telephone: {
    bsonType: "string",
    description: "password␣required"
    }
    }
    }
    }
    }
);

    /* 3. In case of the post’s document there must be content.*/

    db.runCommand({collMod: "posts", 
    validator: {
    $jsonSchema: {
    required: [ "content"],
    properties: {
    content: {
    bsonType: "string",
    description: "content␣string␣required"
    }
    }
    }
    }
    }
);

/*4.a)An entry of a user with only email, name and password.*/

db.users.insertOne({
    "name":"ABC",
    "email":"ABC@gmail.com",
    "password":"ojbivahbvfoajnroun"
});


/*4.b) An entry of users with basic info and hobbies(consider a user may have multiple hobbies).*/

db.users.insertOne({
    "name":"DEF",
    "email":"DEF@gmail.com",
    "password":"woduowuvo",
    "phone number":"000000",
    "date of birth":ISODate("1992-05-05"),
    "address":"XXX,XXX",
    "hobbies":[{
        "no1":"reading",
        "no2":"gardening",
        "no3":"drawing"
    }],
    "profile created at":new Date()
});


/*4.c) Two entries of users with basic info and telephone number (work and personal). */

db.users.insertMany([{
    "name":"XYZ",
    "email":"XYZ@gmail.com",
    "password":"avihbiehri",
    "phone number":[{
        "work":"01700832572",
        "personal":"01748595145"
    }
    ],
    "date of birth":ISODate("2000-08-17"),
    "address":"svuou,vdsig",
    "profile created at":new Date()

},
    {
        "name":"MNO",
    "email":"MNO@gmail.com",
    "password":"165wvjdbiwhbi",
    "phone number":[{
        "work":"01314965873",
        "personal":"02698753214"
    }
    ],
    "date of birth":ISODate("1997-05-15"),
    "address":"156hvdwuhi",
    "profile created at":new Date()
    }
]);


/*4.d) Four posts with the content, creation time.*/

db.posts.insertMany([{
    "content":"Status",
    "creation time":new Date()

},{
    "content":"Picture",
    "creation time":new Date()
},{
    "content":"Story",
    "creation time":new Date()
},{
    "content":"Video",
    "creation time":new Date()
}
    
]);



/*5.a)Add multiple followers for multiple users.*/

db.users.updateMany(
    { name: { $in: ["ABC", "DEF", "XYZ", "MNO"] } }, 
    { $push: { followers: { $each: ["Follower1", "Follower2", "Follower3"] } } } 
 );

 /*5.b) Add multiple friends for multiple users*/

 db.users.updateMany(
    { name: { $in: ["ABC", "DEF", "XYZ", "MNO"] } }, 
    { $push: { friends: { $each: ["Friend1", "Friend2", "Friend3"] } } } 
 );

 /*5.c) Add multiple users who like a post.*/

 db.posts.updateOne({
    "content":"Status"
 },
 {
    $set:{
        "Liked by":[
            {
                "user":"ABC",

            },
            {
                "user":"MNO"
            },
            {
                "user":"XYZ"
            }
        ]
    }
 });

 /*5.d) Add at least two comments for two posts with the commenters.*/
 
 db.posts.updateOne( { "content": "Video" }, { $set: { "commenter": [
    {
        "commenter":"ABC",
        "comment":"Video is too long!"
    },
    {
        "commenter":"XYZ",
        "comment":"The quality is good"
    }
 ] } } )

 db.posts.updateOne( { "content": "Story" }, { $set: { "commenter": [
    {
        "commenter":"ABC",
        "comment":"Nice"
    },
    {
        "commenter":"MNO",
        "comment":"The colors are good"
    }
 ] } } );


 /*6.a)Display the total number of posts.*/

 db.posts.find().count();

 /*6.b)Display the most recent to oldest posts along with their poster(s).*/

 /*inserting some records from one day ago*/
var currentDate = new Date();

var yesterday = new Date();
yesterday.setDate(currentDate.getDate() - 1);

yesterday.setHours(currentDate.getHours());
yesterday.setMinutes(currentDate.getMinutes());
yesterday.setSeconds(currentDate.getSeconds());
yesterday.setMilliseconds(currentDate.getMilliseconds());

db.posts.insertMany([{
    "content": "content1",
    "creation time": yesterday,
    "poster_name": "Emily"
},
{
    "content": "content2",
    "creation time": yesterday,
    "poster_name": "Jacob"
}
]);

/*inserting some records from two days ago*/

var currentDate = new Date();

var yesterday2 = new Date();
yesterday2.setDate(currentDate.getDate() - 2);

yesterday2.setHours(currentDate.getHours());
yesterday2.setMinutes(currentDate.getMinutes());
yesterday2.setSeconds(currentDate.getSeconds());
yesterday2.setMilliseconds(currentDate.getMilliseconds());

db.posts.insertMany([{
    "content": "Your post content here",
    "creation time": yesterday2,
    "poster_name": "Terry"
},
{
    "content": "Your post content here",
    "creation time": yesterday,
    "poster_name": "Gina"
}
]);

/*updating the previous records to include their posters*/
db.posts.updateOne( { "content": "Status" }, { $set: { "poster_name": "John Doe" } } );
db.posts.updateOne( { "content": "Picture" }, { $set: { "poster_name": "John Dane" } } );
db.posts.updateOne( { "content": "Story" }, { $set: { "poster_name": "John Dean" } } );
db.posts.updateOne( { "content": "Video" }, { $set: { "poster_name": "John Dome" } } );

/*sorting the records*/
 db.posts.find({}, {"creation time": 1, "poster_name": 1, _id: 0}).sort({"creation time": -1});

/*6.c)Show all the posts that were created from yesterday.*/

var currentDate = new Date();

var yesterdayStart = new Date(currentDate);
yesterdayStart.setDate(currentDate.getDate() - 1);
yesterdayStart.setHours(0, 0, 0, 0); /*Set to the beginning of the day*/

var yesterdayEnd = new Date(currentDate);
yesterdayEnd.setDate(currentDate.getDate() - 1);
yesterdayEnd.setHours(23, 59, 59, 999); /*Set to the end of the day*/

var yesterdayPostsCursor = db.posts.find(
    {
    "creation time": 
    {
        $gte: yesterdayStart,
        $lte: yesterdayEnd
    }
});

while (yesterdayPostsCursor.hasNext()) 
{
    var post = yesterdayPostsCursor.next();
    printjson(post);
}


/*6.d) Show all the users who are following more than 3 users.*/

db.users.updateMany(
    { name: { $in: ["ABC", "DEF"] } }, 
    { $push: { following: { $each: ["FollowingUser1", "FollowingUser2", "FollowingUser3","followingUser4"] } } } 
 );

 db.users.find({
    "following": {
      $exists: true
    },
    $expr: {
      $gt: [{ $size: "$following" }, 3]
    }
  },
  {
    "name": 1,
    "_id": 0
  });

  /*6.e)Show all the users who were born within 1990-2000.*/

  
db.users.find(
  {
    "date of birth": 
    {
      $gte: new Date("1990-01-01"),
      $lte: new Date("2000-12-31")
    }
  },{"name":1,"_id":0});



  /*6.f)Show three profiles that were created the earliest.*/

  db.posts.find().sort({"creation time":-1}).limit(3);

  /*6.g)Show all the posts where commenter "ABC" commented.*/

  db.posts.find(
    { "commenter.commenter": "ABC" },
    { "content": 1, "creation time": 1, "poster_name": 1, "_id": 0 }
  );
  

  /*6.h)Show the user’s detail who posted "Life is too good".*/


  /*First inserting one record with the required post*/

  db.posts.insertOne({
    "content":"Life is too good",
    "creation time":new Date(),
    "poster_name":"ABC"
  }

  );

    db.posts.aggregate([
        {
          $match: {
            "content": "Life is too good"
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "poster_name",
            foreignField: "name",
            as: "poster_info"
          }
        }
      ]);


      /*7.Delete the users who don’t have any work phone number.*/
      
      db.users.deleteMany({
        $or: [
          { "phone number": { $exists: false } },
          { "phone number": { $size: 0 } },
          { "phone number.work": { $exists: false } }
        ]
      });

      
      