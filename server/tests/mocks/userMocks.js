const User = {
  user0: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe9@email.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe6@email.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user1: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@email.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user2: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoeemail.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user3: {
    firstName: 'John123',
    lastName: 'Doe',
    email: 'johndoeemail.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user4: {
    firstName: 'John',
    lastName: 'Doe123',
    email: 'johndoeemail.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user5: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe5@email.com',
    password: new Array(50).join('a'),
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user6: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe5@email.com',
    password: 'password123',
    address: '',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user7: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe5@email.com',
    password: 'password123',
    address: 'Nairobi @3#$',
    bio: new Array(202).join('a'),
    occupation: 'Musician',
    expertise: 'rapping',
  },
  user8: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe5@email.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: ' ',
    expertise: 'rapping',
  },
  user9: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe5@email.com',
    password: 'password123',
    address: 'Nairobi Kenya',
    bio: 'rapper, record producer, and actor who was known as one of the most-controversial and best-selling artists of the early 21st century',
    occupation: 'Musician',
    expertise: ' ',
  },
  user10: {
    email: 'johndoe6@email.com',
    password: 'password123',
  },
  user11: {
    email: ' ',
    password: 'password123',
  },
  user12: {
    email: 'johndoe@email.com',
    password: ' ',
  },
  user13: {
    email: 'johndoe6@email.com',
    password: 'password1234',
  },
  user14: {
    email: 'janedoe@email.com',
    password: 'password123',
  },
  user15: {
    email: 'janedoeemail.com',
    password: 'password123',
  },
  user16: {
    email: 'johndoe@email.com',
    password: new Array(50).join('a'),
  },
};

const tokens = {
  userToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huZG9lM0BlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR3Z2FhUXBCTHZGak92QTJlM2o1Z3lPY3dBWTYueTRVVkdHVzE2VVdYM1dSclhlMzlPTmhhVyIsImFkZHJlc3MiOiJOYWlyb2JpIEtlbnlhIiwiYmlvIjoicmFwcGVyLCByZWNvcmQgcHJvZHVjZXIsIGFuZCBhY3RvciB3aG8gd2FzIGtub3duIGFzIG9uZSBvZiB0aGUgbW9zdC1jb250cm92ZXJzaWFsIGFuZCBiZXN0LXNlbGxpbmcgYXJ0aXN0cyBvZiB0aGUgZWFybHkgMjFzdCBjZW50dXJ5Iiwib2NjdXBhdGlvbiI6Ik11c2ljaWFuIiwiZXhwZXJ0aXNlIjoicmFwcGluZyIsImlzbWVudG9yIjp0cnVlLCJpc2FkbWluIjpmYWxzZSwiY3JlYXRlZF9vbiI6IjIwMTktMDktMTNUMDY6MDQ6MTUuNDE1WiIsImlhdCI6MTU2ODg3ODAzOCwiZXhwIjoxNTY5MjM4MDM4fQ.UWtpaV_t8NnR8-4U9nUZiCwueRrPDPoQgHEYkIfv1OM',
  adminToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiSW0iLCJsYXN0bmFtZSI6ImFkbWluIiwiZW1haWwiOiJJbUFkbWluQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGhUTFlmdWFZcHk0VGVwTVIuLy9lUWVLUVVMWUlsUkttTW1FUi5kMzNtcGVwLnpDMVE5b2tlIiwiYWRkcmVzcyI6Ik5haXJvYmkgS2VueWEiLCJiaW8iOiJyYXBwZXIsIHJlY29yZCBwcm9kdWNlciwgYW5kIGFjdG9yIHdobyB3YXMga25vd24gYXMgb25lIG9mIHRoZSBtb3N0LWNvbnRyb3ZlcnNpYWwgYW5kIGJlc3Qtc2VsbGluZyBhcnRpc3RzIG9mIHRoZSBlYXJseSAyMXN0IGNlbnR1cnkiLCJvY2N1cGF0aW9uIjoiTXVzaWNpYW4iLCJleHBlcnRpc2UiOiJyYXBwaW5nIiwiaXNtZW50b3IiOmZhbHNlLCJpc2FkbWluIjp0cnVlLCJjcmVhdGVkX29uIjoiMjAxOS0wOS0xM1QwNjowMzo0NS4yMDJaIiwiaWF0IjoxNTY4ODc3ODcxLCJleHAiOjE1NjkyMzc4NzF9.nyZ1-NFs1uAfMZ_dkN9MdoeDQyvgKpMFv1MgbMBOcqQ',
  mentorToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RuYW1lIjoiSm9obiIsImxhc3RuYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huZG9lMUBlbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR4Z2h6VDZ0dlZDcHg3UkguZW5mOGIuaDcuRHhyem1LMHk1c3g2ZDl1TGxvQmlpNmt5dTIzMiIsImFkZHJlc3MiOiJOYWlyb2JpIEtlbnlhIiwiYmlvIjoicmFwcGVyLCByZWNvcmQgcHJvZHVjZXIsIGFuZCBhY3RvciB3aG8gd2FzIGtub3duIGFzIG9uZSBvZiB0aGUgbW9zdC1jb250cm92ZXJzaWFsIGFuZCBiZXN0LXNlbGxpbmcgYXJ0aXN0cyBvZiB0aGUgZWFybHkgMjFzdCBjZW50dXJ5Iiwib2NjdXBhdGlvbiI6Ik11c2ljaWFuIiwiZXhwZXJ0aXNlIjoicmFwcGluZyIsImlzbWVudG9yIjp0cnVlLCJpc2FkbWluIjpmYWxzZSwiY3JlYXRlZF9vbiI6IjIwMTktMDktMTNUMDY6MDQ6MDYuNTkxWiIsImlhdCI6MTU2ODg3ODA3NiwiZXhwIjoxNTY5MjM4MDc2fQ.F93by3IqISlAFIQel-cGCamWkKgcJFobVvPPfd3VBf4',
  expiredToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiSW0iLCJsYXN0bmFtZSI6ImFkbWluIiwiZW1haWwiOiJJbUFkbWluQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJFBGbU1HSkx5NTllR1c4Y2t6bWNMOWVSelBvQy9DZjNCMzNTZjM1aGY3eFdEVmc0SlJiZ2VlIiwiYWRkcmVzcyI6Ik5haXJvYmkgS2VueWEiLCJiaW8iOiJyYXBwZXIsIHJlY29yZCBwcm9kdWNlciwgYW5kIGFjdG9yIHdobyB3YXMga25vd24gYXMgb25lIG9mIHRoZSBtb3N0LWNvbnRyb3ZlcnNpYWwgYW5kIGJlc3Qtc2VsbGluZyBhcnRpc3RzIG9mIHRoZSBlYXJseSAyMXN0IGNlbnR1cnkiLCJvY2N1cGF0aW9uIjoiTXVzaWNpYW4iLCJleHBlcnRpc2UiOiJyYXBwaW5nIiwiaXNtZW50b3IiOnRydWUsImlzYWRtaW4iOnRydWUsImNyZWF0ZWRfb24iOiIyMDE5LTA5LTEwVDAzOjE5OjM1LjgzMVoiLCJpYXQiOjE1NjgxMTY4NjksImV4cCI6MTU2ODIwMzI2OX0.JfqJXO1wlHdHJaTaT-_ieLvxPO8-w8G0p6DFVkWA_QQ',
};
export {
  User,
  tokens,
};
