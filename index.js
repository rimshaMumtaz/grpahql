const express = require('express');
//graphql
const expressGraphql = require('express-graphql');
const {
    GraphQLSchema,                  //for schema
    GraphQLObjectType,              // type that we wil import
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');
const app = express();


const PanelTypes = new GraphQLObjectType({
    name: "Panel Details",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        type: {type: GraphQLNonNull(GraphQLString)},
        title: {type: GraphQLString},
        imageURL: {type: GraphQLString},
        imageLinkURL: {type: GraphQLString},
        body: {type: GraphQLString},
    })
});

const walletTypes = new GraphQLObjectType({
    name: 'Wallet details',
    fields: () => ({
        totalEarning: {type: GraphQLNonNull(GraphQLInt)},
        balance: {type: GraphQLInt}
    })
});

const UserConnection = new GraphQLObjectType({
    name: "Pagination",
    fields: () => ({
        totalCount: {type: GraphQLNonNull(GraphQLInt)},
        edges: {
            type: {type: ([UserEdges])}
        },
        PageInfo: {
            type: {type: GraphQLNonNull(PagesInfo)}
        },
        list: {
            type: {type: ([UserType])}
        }
    })
});

const UserEdges = new GraphQLObjectType({
    name: 'Limit and cursor',
    fields: () => ({
        cursor: {type: GraphQLNonNull(GraphQLInt)},
        node: {type: GraphQLNonNull(UserType)}
    })
});

const PagesInfo = new GraphQLObjectType({
    name: 'Page information',
    fields: () => ({
        startCursor: {type: GraphQLNonNull(GraphQLInt)},
        endCursor: {type: GraphQLNonNull(GraphQLString)},
        hasNextPage: {type: GraphQLNonNull(GraphQLBoolean)},
        hasPreviousPage: {type: GraphQLNonNull(GraphQLBoolean)},
    })
});

const PastBroadcastConnection = new GraphQLObjectType({
    name: "Past broadcast connection Pagination",
    fields: () => ({
        totalCount: {type: GraphQLNonNull(GraphQLInt)},
        edges: {
            type: {type: GraphQLNonNull([PastBroadcastEdge])}
        },
        PageInfo: {
            type: {type: GraphQLNonNull(PagesInfo)}
        },
        list: {
            type: {type: GraphQLNonNull([UserType])}
        }
    })
});

const PastBroadcastEdge  = new GraphQLObjectType({
    name: 'Limit and cursor past broadcast',
    fields: () => ({
        cursor: {type: GraphQLNonNull(GraphQLInt)},
        node: {type: GraphQLNonNull(PastBroadcast)}
    })
});

const PastBroadcast = new GraphQLObjectType({
    name: 'past broadcast',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        permlink: {type: GraphQLNonNull(GraphQLString)},
        ageRestriction: {type: GraphQLNonNull(GraphQLBoolean)},
        length: {type: GraphQLNonNull(GraphQLString)},
        thumbnailUrl: {type: GraphQLNonNull(GraphQLString)},
        title: {type: GraphQLNonNull(GraphQLString)},
        createdAt: {type: GraphQLNonNull(GraphQLString)},
        totalReward: {type: GraphQLNonNull(GraphQLString)},
        viewCount: {type: GraphQLNonNull(GraphQLString)},
        playbackUrl: {type: GraphQLNonNull(GraphQLString)},
        language: {type: GraphQLNonNull(GraphQLString)},
        category: {type: GraphQLNonNull(GraphQLString)},
        resolution: {type: GraphQLNonNull(ResolutionType)},
        creator: {type: GraphQLNonNull(UserType)}
    })
});

const ResolutionType = new GraphQLObjectType({
    name: "Resolution type",
    fields: () => ({
        resolution: {type: GraphQLNonNull(GraphQLString)},
        url: {type: GraphQLNonNull(GraphQLString)},
    })
});

const SubSetting = new GraphQLObjectType({
    name: "Sub setting type",
    fields: () => ({
        badgeText: {type: GraphQLNonNull(GraphQLString)},
        badgeColor: {type: GraphQLNonNull(GraphQLString)},
        textColor: {type: GraphQLNonNull(GraphQLString)},
        benefits: {type: GraphQLNonNull([GraphQLString])},
    })
});

const UserPrivateInfo = new GraphQLObjectType({
    name: "User Private Info",
    fields: () => ({
        badgeText: {type: GraphQLNonNull(GraphQLString)},
        badgeColor: {type: GraphQLNonNull(GraphQLString)},
        textColor: {type: GraphQLNonNull(GraphQLString)},
        benefits: {type: GraphQLNonNull([GraphQLString])},
    })
});

//userType
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This returns the users',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt)},
        username: {type: GraphQLNonNull(GraphQLString)},
        displayName: {type: GraphQLNonNull(GraphQLString)},
        avatar: {type: GraphQLString},
        about: {type: GraphQLString},
        panels: {
            type: GraphQLNonNull(GraphQLList([PanelTypes]))
        },
        createdAt: {type: GraphQLNonNull(GraphQLString)},
        wallet: {
            type: GraphQLNonNull(walletTypes)
        },
        partnerStatus: {type: GraphQLNonNull(GraphQLString)},
        canSubscribe: {type: GraphQLNonNull(GraphQLBoolean)},
        isFollowing: {type: GraphQLBoolean},
        isSubscribing: {type: GraphQLBoolean},
        myRoomRole: {type: GraphQLString},
        livestream: {type: GraphQLString},
        hostingLivestream: {type: GraphQLString},
        role: {type: GraphQLNonNull(GraphQLString)},
        followers: {
            type: GraphQLNonNull(UserConnection)
        },
        following: {
            type: GraphQLNonNull(UserConnection)
        },
        pastBroadcasts: {
            type: GraphQLNonNull(PastBroadcastConnection)
        },
        subSetting: {
            type: SubSetting
        },
        private: {
            type: UserPrivateInfo
        }


    })
});


//create schema
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        users: {
            type: new GraphQLList(UserType),
            description: 'List of all users',
            resolve: () => users
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQueryType
});

//route for app
app.use('/graphql', expressGraphql({
    schema: schema,
    graphiql: true   //this will give us actual ui for our graphql application
}))


//the port at which app will be running
app.listen(5000., () => console.log('Server Started'));
