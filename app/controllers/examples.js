'use strict'

// pulling in some code that allows us to create controllers
const controller = require('lib/wiring/controller')
// pulling in a JS object that has all of our mongoose models as properties
const models = require('app/models')
// access the actual Mongoose model on that object
const Example = models.example

// all three of these requires are pulling in methods that will set a
// 'current user' based on a token
const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

// `req` is a JS object that represents all of the incoming HTTP request data
// `res` is a JS object representing the response that we will send back to the
// user, it has methods that allow is to actually send that response
// `next` is used just for error handling
const index = (req, res, next) => {
  // `Example` is a mongoose model
  // `.find()` queries the DB for all the `examples`
  // and it returns an array of mongoose document objects
  Example.find()
  // mongoose methods return promises
  // sending a response with `res.json(< our data as a POJO >)`
    .then(examples => res.json({
      // `examples` is an array of mongoose objects, and we need to turn it into
      // regular JS objects, so we use `.map` to call the mongoose method
      // `.toJSON` on it
      examples: examples.map((e) =>
      // converting into a regular JS object, including virtual properties,
      // and if `user: req.user` KV pair, the response will include a field
      // called `editable`, which tells the client whether the currently
      // signed-in user is supposed to be able to edit this `example`
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    // pass any errors along to the `next` function
    .catch(next)
}

const show = (req, res) => {
  res.json({
    example: req.example.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  // the body of HTTP requests (the JSON) gets parsed by Express as `req.body`
  // `req.body` will be a POJO with that same data
  // `Object.assign` is used here to add an `_owner` property to the newly
  // created resource, which will be the ID of the user whose token was provided
  const example = Object.assign(req.body.example, {
    _owner: req.user._id
  })
  // pass the above JS object to mongoose's `Example.create` so that it will
  // actually store the object in the database
  Example.create(example)
  // `Example.create` returns a mongoose document object representing the
  // record that was created
    .then(example =>
      // sets the status code of our response, but DOESN'T send the response yet
      res.status(201)
      // this is actually `res.json`, you can chain it off of `.status` to
      // send back the data to the client
        .json({
          // turn `example` into a regular JS object, include virtuals, etc
          example: example.toJSON({ virtuals: true, user: req.user })
        }))
        // dont forget to handle errors in the promise chain
    .catch(next)
}

const update = (req, res, next) => {
  // if the client tries to send a resource with an updated `_owner` property,
  // we delete that property before we actually change anything in the DB
  delete req.body.example._owner  // disallow owner reassignment.

  // `req.example` is set for us by `setModel`
  // we just called mongoose's `.update` method and pass the client-supplied
  // JSON as an argument
  req.example.update(req.body.example)
    // don't send back any JSON, just send status 204
    // `res.sendStatus` is the method you use if you want to send only a status
    // code and no body
    .then(() => res.sendStatus(204))
    // if something went wrong with the update, `.catch` will trigger
    .catch(next)
}

const destroy = (req, res, next) => {
  // relies on `setModel` to find the example based on the ID in the routes
  // `.remove` is the mongoose method for deleting something
  req.example.remove()
    // just send back 204, no JSON
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  // `setUser`: checks if theres a token, if there is, it sets `req.user`
  // equal to the user whose token it is. If there isn't a token, it still works
  { method: setUser, only: ['index', 'show'] },
  // `authenticate`: checks if theres a token, if there is one, it sets `req.user`
  // if there's not, it sends 401 unauthorized
  { method: authenticate, except: ['index', 'show'] },
  // `setModel` is equivalent to `set_example` in Rails
  // `setModel` without `forUser` will find the example resource regardless of
  // who owns it -- this means anyone can do these controller actions
  // specifically it sets `req.example` to be the example resource that matches
  // the provided id
  { method: setModel(Example), only: ['show'] },
  // if you pass `forUser: true`, only users who own the resource will be able
  // to do the controller action
  { method: setModel(Example, { forUser: true }), only: ['update', 'destroy'] }
] })
