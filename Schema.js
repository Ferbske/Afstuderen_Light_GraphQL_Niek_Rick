const graphql = require('graphql');

const {User} = require('./Schema/User');
const {Post} = require('./Schema/Post');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'Users',
    fields: () => ({
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        dob: {
            type: GraphQLString
        },
        friends: {
            type: new GraphQLList(UserType)
        },
        posts: {
            type: new GraphQLList(PostType)
        },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return Post.findById(args.id);
            }
        },
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return Post.find();
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find().populate('posts')
                    .populate({
                        path: 'friends posts',
                        populate: {
                            path: 'friends posts',
                            populate: {
                                path: 'friends posts',
                                populate: {
                                    path: 'friends posts'
                                }
                            }
                        }
                    });
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addPost: {
            type: PostType,
            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                description: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let post = new Post({
                    title: args.title,
                    description: args.description,
                });
                return post.save();
            }
        },
        addUser: {
            type: UserType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                password: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                dob: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parent, args) {
                let user = new User({
                    email: args.email,
                    description: args.description,
                    name: args.name,
                    dob: args.dob
                });
                return user.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});