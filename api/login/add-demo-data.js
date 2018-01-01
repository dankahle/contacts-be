const chance = require('chance')(),
  UserData = require('../users/data'),
  ContactsData = require('../contacts/data');


module.exports =  function addDemoData(user, req, res, next) {

  if (process.env.NODE_ENV === 'unit') {
    return Promise.resolve();
  }

  const userData = new UserData(req, res, next);
  const contactsData = new ContactsData(req, res, next);

  const friends = {id: chance.guid(), name: 'Friends', icon: 'label'};
  var coworkers = {id: chance.guid(), name: 'Coworkers', icon: 'label'};
  var businesses = {id: chance.guid(), name: 'Businesses', icon: 'label'};

  var contacts = [
    {
      userId: user.id,
      id: chance.guid(),
      name: 'Jane',
      company: 'Jane Co',
      jobTitle: 'Manager',
      labels:[friends, coworkers],
      "emails" : [
        {
          "email" : "jane1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "jane2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },
    {
      userId: user.id,
      id: chance.guid(),
      name: 'Martha',
      company: 'Martha Co',
      jobTitle: 'Engineer',
      labels:[friends],
      "emails" : [
        {
          "email" : "martha1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "martha2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },
    {
      userId: user.id,
      id: chance.guid(),
      name: 'Brenda',
      company: 'Brenda Co',
      jobTitle: 'QA',
      labels:[coworkers],
      "emails" : [
        {
          "email" : "brenda1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "brenda2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },
    {
      userId: user.id,
      id: chance.guid(),
      company: 'Roto Rooter',
      labels:[businesses],
      "emails" : [
        {
          "email" : "rooter1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "rooter2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },
    {
      userId: user.id,
      id: chance.guid(),
      company: 'Chem Lawn',
      labels:[businesses],
      "emails" : [
        {
          "email" : "chems1@gmail.com",
          "label" : "Work"
        },
        {
          "email" : "chems2@gmail.com",
          "label" : "Home"
        }
      ],
      "phones" : [
        {
          "prefix" : "1",
          "phone" : "111-222-3333",
          "label" : "Work"
        },
        {
          "prefix" : "55",
          "phone" : "112-222-3333",
          "label" : "Mobile"
        }
      ],
      "addresses" : [
        {
          "address" : "952 NE Lovell St. Hillsboro, OR 97124",
          "label" : "Home"
        },
        {
          "address" : "10260 SW Greenburg Rd #600, Tigard, OR 97223",
          "label" : "Work"
        }
      ],
      "websites" : [
        {
          "website" : "https://www.google.com",
          "label" : "google"
        },
        {
          "website" : "www.weather.com",
          "label" : "weather"
        }
      ],
      "notes" : "notes first line\nnotes second line\nnotes third line"
    },
  ];

  user.labels = [friends, coworkers, businesses];
  const promises = [];
  promises.push(userData.updateOne(user.id, user));
  contacts.forEach(contact => {
    promises.push(contactsData.addOne(contact));
  });
  return Promise.all(promises);
}

