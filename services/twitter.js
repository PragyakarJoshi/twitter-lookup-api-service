const Twit = require('twit');
const Config = require('../config.json');


exports.getTweets = (req, res) => {
    
    const searchKeyword = req.params.keyword;
    const totalTweets = 50;
    const twitClient = new Twit({
        consumer_key: Config.consumerKey,
        consumer_secret: Config.consumerSecret,
        access_token: Config.accessToken,
        access_token_secret: Config.accessTokenSecret,
        timeout_ms: 60*1000
    })
    let tweets = {
        tweetList : []
    }
    twitClient.get('search/tweets', { q: searchKeyword, count: totalTweets }, function(err, data, result) {
        
        for(let i = 0; i < totalTweets; i++) {
            tweets.tweetList.push ({
                "id" : data['statuses'][i]['id'],
                "tweet" : data['statuses'][i]['text'],
                "user" : data['statuses'][i]['user']['screen_name']
            })
        }        
        tweetsJSON = JSON.stringify(tweets);   
        console.log(tweetsJSON);
        res.send(tweetsJSON);  
    }); 
}

