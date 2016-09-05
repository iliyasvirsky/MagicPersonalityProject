var db = require('../db');

// npm install watson-developer-cloud
var PersonalityInsightsV2 = require('watson-developer-cloud/personality-insights/v2');

var personality_insights = new PersonalityInsightsV2({
  //you get this for your bluemix app
  username: 'xxxxxxxxx',
  password: 'xxxxxxxxxxxx'
});

// to initiate the call to the server do a post request 
// to http://192.168.1.102:3000/api/wat/watson

// the data is curently sent in json format {"data": "the massive text bloob"}

var Wat = module.exports;

// use callWat(data) to get data from watson 
Wat.callWat = function(bigData, screen_name) {
  // check to see if data alreay exists for this user...
  return db.collection('watsonData').findOne({screen_name:screen_name})
    .then(function(response){
      if (response){//user info exists
        console.log('response in watModel: ',response);
        return response.wat_data;
      }
      else{
        return new Promise(function(resolve, reject) {

          var data = bigData || "-_-" // <-- big data goes here

          // make a call to watson
          // console.log('data in watModel: ',data);
          personality_insights.profile({
              text: `${data}`,
              language: 'en'
            },
            function(err, response) {
              if (err) {
                console.log('error:', err);
                reject(err) 
              } else {
                // console.log(JSON.stringify(response, null, 2));
                // TODO:
                // Store info in database
                ///how to make a data base call here???
                var watObj = watAnalyze(JSON.stringify(response));
                resolve(watObj)

              }
            });

        })

      }

    })


};

// make a fake call to watson
Wat.callWatTest = function() {

  return new Promise(function(resolve, reject) {
    // watson object
    var data = {"id":"*UNKNOWN*","source":"*UNKNOWN*","word_count":13420,"processed_lang":"en","tree":{"id":"r","name":"root","children":[{"id":"personality","name":"Big 5","children":[{"id":"Openness_parent","name":"Openness","category":"personality","percentage":0.9199876315468459,"children":[{"id":"Openness","name":"Openness","category":"personality","percentage":0.9199876315468459,"sampling_error":0.0465945872,"children":[{"id":"Adventurousness","name":"Adventurousness","category":"personality","percentage":0.1410538613586259,"sampling_error":0.0415897472},{"id":"Artistic interests","name":"Artistic interests","category":"personality","percentage":0.35135363117205365,"sampling_error":0.0858465396},{"id":"Emotionality","name":"Emotionality","category":"personality","percentage":0.037509559590780506,"sampling_error":0.0387454684},{"id":"Imagination","name":"Imagination","category":"personality","percentage":0.2910811205319469,"sampling_error":0.053372176},{"id":"Intellect","name":"Intellect","category":"personality","percentage":0.8730581572745519,"sampling_error":0.044925441999999996},{"id":"Liberalism","name":"Authority-challenging","category":"personality","percentage":0.48874096704135966,"sampling_error":0.0701699064}]},{"id":"Conscientiousness","name":"Conscientiousness","category":"personality","percentage":0.23003417357500366,"sampling_error":0.0592680248,"children":[{"id":"Achievement striving","name":"Achievement striving","category":"personality","percentage":0.062414986890740376,"sampling_error":0.08194327600000001},{"id":"Cautiousness","name":"Cautiousness","category":"personality","percentage":0.6876387450476759,"sampling_error":0.0762045316},{"id":"Dutifulness","name":"Dutifulness","category":"personality","percentage":0.05447364454272319,"sampling_error":0.049283926400000004},{"id":"Orderliness","name":"Orderliness","category":"personality","percentage":0.18865076241044232,"sampling_error":0.0564978628},{"id":"Self-discipline","name":"Self-discipline","category":"personality","percentage":0.22363874582142707,"sampling_error":0.040953996},{"id":"Self-efficacy","name":"Self-efficacy","category":"personality","percentage":0.07475065968846573,"sampling_error":0.07510732120000001}]},{"id":"Extraversion","name":"Extraversion","category":"personality","percentage":0.5790406229161719,"sampling_error":0.0451894648,"children":[{"id":"Activity level","name":"Activity level","category":"personality","percentage":0.18369103515551755,"sampling_error":0.0621657672},{"id":"Assertiveness","name":"Assertiveness","category":"personality","percentage":0.0504715031256418,"sampling_error":0.067528138},{"id":"Cheerfulness","name":"Cheerfulness","category":"personality","percentage":0.0007373958180280638,"sampling_error":0.0845551728},{"id":"Excitement-seeking","name":"Excitement-seeking","category":"personality","percentage":0.013600642407192942,"sampling_error":0.070917592},{"id":"Friendliness","name":"Outgoing","category":"personality","percentage":0.046072284080152126,"sampling_error":0.0623799488},{"id":"Gregariousness","name":"Gregariousness","category":"personality","percentage":0.056282315558164375,"sampling_error":0.0504479136}]},{"id":"Agreeableness","name":"Agreeableness","category":"personality","percentage":0.34163032289015693,"sampling_error":0.08119585559999999,"children":[{"id":"Altruism","name":"Altruism","category":"personality","percentage":0.002190104374788393,"sampling_error":0.0563301036},{"id":"Cooperation","name":"Cooperation","category":"personality","percentage":0.2199516953088957,"sampling_error":0.06819543480000001},{"id":"Modesty","name":"Modesty","category":"personality","percentage":0.2884900045341324,"sampling_error":0.044208154},{"id":"Morality","name":"Uncompromising","category":"personality","percentage":0.12771572778193985,"sampling_error":0.0516654832},{"id":"Sympathy","name":"Sympathy","category":"personality","percentage":0.2361050927135564,"sampling_error":0.08307741},{"id":"Trust","name":"Trust","category":"personality","percentage":0.0085143173043708,"sampling_error":0.043561765599999996}]},{"id":"Neuroticism","name":"Emotional range","category":"personality","percentage":0.703555848415597,"sampling_error":0.0755805072,"children":[{"id":"Anger","name":"Fiery","category":"personality","percentage":0.8165858655384226,"sampling_error":0.0794379108},{"id":"Anxiety","name":"Prone to worry","category":"personality","percentage":0.7639579384140786,"sampling_error":0.0434163992},{"id":"Depression","name":"Melancholy","category":"personality","percentage":0.7820578734533091,"sampling_error":0.0456541636},{"id":"Immoderation","name":"Immoderation","category":"personality","percentage":0.00859665978813956,"sampling_error":0.043636579999999994},{"id":"Self-consciousness","name":"Self-consciousness","category":"personality","percentage":0.9105064560503263,"sampling_error":0.0452781776},{"id":"Vulnerability","name":"Susceptible to stress","category":"personality","percentage":0.9220479110106625,"sampling_error":0.067559486}]}]}]},{"id":"needs","name":"Needs","children":[{"id":"Structure_parent","name":"Structure","category":"needs","percentage":0.000545246743352823,"children":[{"id":"Challenge","name":"Challenge","category":"needs","percentage":0.05203708854024586,"sampling_error":0.0674877436},{"id":"Closeness","name":"Closeness","category":"needs","percentage":0.09028148770010602,"sampling_error":0.0664411504},{"id":"Curiosity","name":"Curiosity","category":"needs","percentage":0.8680374627970093,"sampling_error":0.0922654468},{"id":"Excitement","name":"Excitement","category":"needs","percentage":0.2680733542205842,"sampling_error":0.08468558200000001},{"id":"Harmony","name":"Harmony","category":"needs","percentage":0.04284251041805365,"sampling_error":0.0833657876},{"id":"Ideal","name":"Ideal","category":"needs","percentage":0.22738174326437272,"sampling_error":0.0761141748},{"id":"Liberty","name":"Liberty","category":"needs","percentage":0.43972248184991947,"sampling_error":0.1137174168},{"id":"Love","name":"Love","category":"needs","percentage":0.06561656408827454,"sampling_error":0.076559332},{"id":"Practicality","name":"Practicality","category":"needs","percentage":0.8097761151430946,"sampling_error":0.07007590279999999},{"id":"Self-expression","name":"Self-expression","category":"needs","percentage":0.6139468375702479,"sampling_error":0.06579655720000001},{"id":"Stability","name":"Stability","category":"needs","percentage":0.04398375649793801,"sampling_error":0.083525388},{"id":"Structure","name":"Structure","category":"needs","percentage":0.000545246743352823,"sampling_error":0.0642075952}]}]},{"id":"values","name":"Values","children":[{"id":"Conservation_parent","name":"Conservation","category":"values","percentage":0.04611684006463318,"children":[{"id":"Conservation","name":"Conservation","category":"values","percentage":0.04611684006463318,"sampling_error":0.0613746372},{"id":"Openness to change","name":"Openness to change","category":"values","percentage":0.26589162312071224,"sampling_error":0.0573373648},{"id":"Hedonism","name":"Hedonism","category":"values","percentage":0.43387168355499467,"sampling_error":0.103683102},{"id":"Self-enhancement","name":"Self-enhancement","category":"values","percentage":0.08471692358341021,"sampling_error":0.079005134},{"id":"Self-transcendence","name":"Self-transcendence","category":"values","percentage":0.07523609536020476,"sampling_error":0.0584313128}]}]}]},"warnings":[]};
    var data2 = watAnalyze(JSON.stringify(data));
    resolve(data2);
  });
};


Wat.saveDb = function(watResponse, screen_name) {

  var attrs={screen_name:screen_name , wat_data:watResponse};
  return db.collection('watsonData').insert(attrs)
    .then(function(resp){

      return watResponse;
    });
};


// this function should be somewhere else //> 
function watAnalyze(data) {

  data = JSON.parse(data);
  // obj to contain the specifics for each of the personality type
  var theMagicAI = {}
  // objs and coresponding arrs of primary and secondary traits
  var primary = {};
  var secondary = {};
  var primaryArray = [];
  var secondaryArray = [];
  // get traits
  var personality = data.tree.children[0].children[0].children
    .forEach(function(trait) {
      primary[trait.name] = trait.percentage;
      trait.children
      .forEach(function(secondaryTrait) {
        secondary[secondaryTrait.name] = secondaryTrait.percentage;
      })
    })
  // make arrays
  for (var traits in primary) {
    primaryArray.push([traits, primary[traits]]);
  }

  for (var trait in secondary) {
    secondaryArray.push([trait, secondary[trait]]);
  }
  // all secondary traits that pass the bar
  var strongSecondaryTraits = secondaryArray.filter(function(item) {
      return item[1] > 0.6;
    })
    //...
  var dominatingPrimaryTrait = primaryArray.reduce(function(prev, next) {
      return (prev > next) ? prev : next;
    })
    //...
  var dominatingSecondaryTrait = secondaryArray.reduce(function(prev, next) {
    return (prev[1] > next[1]) ? prev : next;
  })

  theMagicAI.primaryTraits = {

    'Openness': {

      'likes': ['Practical', 'Traditional', 'Conventional', 'Most comfortable in familiar surroundings'],
      'dislikes': ['mosquitos', 'Cauliflower', 'clowns'],
      // [link, description]
      'links': [
        ['http://esciencenews.com/articles/2016/08/20/europes.oldest.known.living.inhabitant', 'Europes oldest known living inhabitant'],
        ['http://www.kendrahaste.co.uk/sculptures/', 'all that wire']
      ],
      'description': ['Imagination', 'Artistic Interests', 'Emotionality', 'Adventurousness', 'Intellect', 'Liberalism'],
      'descParagraf': "You enjoy being with people, are full of energy, and often experience positive emotions. You tend to be enthusiastic, action-oriented, individual who are likely to say \"Yes!\" or \"Let's go!\" to opportunities for excitement. In groups they like to talk, assert themselves, and draw attention to themselves."
    },

    'Conscientiousness': {

      'likes': [],
      'dislikes': ['mosquitos', 'Cauliflower', 'clowns'],
      'links': [
        ['https://www.buzzfeed.com/jasminnahar/things-youll-relate-to-if-youre-sensible-af?utm_term=.xdGAEd508o#.udmVDW7EO8', 'things you do'],
        ['http://www.forbes.com/sites/theyec/2012/11/26/7-web-productivity-tools-thatll-maximize-your-efficiency/#3a4328551587', 'Maximize your efficiency by using these tools'],
        ['http://www.andysowards.com/blog/2011/50-amazing-samurai-design-illustrations-artwork-w-inspirational-quotes-from-miyamoto-musashi/', 'samurai are cool, arent they']
      ],
      'description': ['Self-Efficacy', 'Orderliness', 'Dutifulness', 'Achievement-Striving', 'Self-Discipline', 'Cautiousness'],
      'descParagraf': "You are an individual that avoids trouble and achieves high levels of success through purposeful planning and persistence. You are also positively regarded by others as intelligent and reliable."
    },

    'Extraversion': {

      'likes': [],
      'dislikes': ['mosquitos', 'Cauliflower', 'clowns'],
      'links': [
        ['https://www.amazon.com/Listening-Martial-Art-Master-Success-ebook/dp/B016LDGR74#nav-subnav', 'bridge the gap between you and fellow introverts, read this beautiful book'],
        []
      ],
      'description': ['Excitement-Seeking', 'High activity level', 'Assertive', 'Gregariousness', 'Friendliness'],
      'descParagraf': 'You are likely an enthusiastic, action-oriented, individual and you enjoy being with people. You are full of energy, and often experience positive emotions. '
    },

    'Agreeableness': {

      'likes': [],
      'dislikes': ['mosquitos', 'Cauliflower', 'clowns'],
      'links': [
        ['https://en.wikipedia.org/wiki/Izumo-taisha', 'exposure to different religions and beliefe systems can helps put things in perspective'],
        []
      ],
      'description': ['Trust', 'Morality', 'Altruism', 'Cooperation', 'Modesty', 'Sympathy'],
      'descParagraf': "You are considerate, friendly, generous, helpful, and willing to compromise their interests with others. Agreeable people also have an optimistic view of human nature. They believe people are basically honest, decent, and trustworthy"
    },
    // Intellect/Imagination // High-end: Openness to Experience // low-end: Neuroticism
    'Emotional range': {

      'likes': [],
      'dislikes': ['mosquitos', 'Cauliflower', 'clowns'],
      'links': [
        ['https://plus.google.com/u/0/collection/EG1lCB', 'You might enjoy this collection of abandoned houses'],
        ['https://www.psychologytoday.com/blog/design-your-path/201305/10-traits-emotionally-resilient-people', 'More on traits for your type']
      ],
      'description': ['Unenvious', 'relaxed', 'Unexcitable', 'patient', 'Undemanding', 'imperturbable', 'Unselfconscious', 'uncritical', 'Masculine', 'optimistic'],
      'descParagraf': 'You tend to be calm, emotionally stable, and free from persistent negative feelings.'
    }
  }

  console.log(dominatingPrimaryTrait, 'dominatingPrimaryTrait')
  console.log(dominatingSecondaryTrait, 'dominatingSecondaryTrait')
  console.log(primaryArray, 'primary Traits')
  console.log(strongSecondaryTraits, 'strong secondary traits')

  //this part need better documentaition or some goodol refactoring into obj or multiArrs
  theMagicAI.allTraits = [dominatingPrimaryTrait, dominatingSecondaryTrait,
    primaryArray, strongSecondaryTraits
  ];

  // theMagicAI.original = data;
  return theMagicAI;

}