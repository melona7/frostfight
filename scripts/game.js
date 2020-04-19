
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 550,
    backgroundColor: "#dddde8",
    parent: "game-container",
    pixelArt: true,
    scene: [splash, instructions, level, info, question, main, panel, lose, win],
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 } 
        }
    }, 
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};
  
const game = new Phaser.Game(config);

const BUILDINGS = {"dana": {
                       "message": "For added warmth, hit up the top floor of this building and enjoy the benefits of its 4,000-square-foot skylight.",
                       "display_name": "Dana Building",
                       "isWarm": false,
                       "wasVisited": false,
                    },
                   "mason": {
                       "message": "Luckily, Mason, Angell, Tisch, and Haven Halls are all connected, so you don't even have to go outside if your next class is next door.",
                       "display_name": "Mason Hall",
                       "isWarm": false,
                       "wasVisited": false,
                    },
                   "hatcher": {
                       "message": "Check out the bridge on the second floor...It'll take you right over to the Ugli while staying in a nice, warm building the whole time.",
                       "display_name": "Hatcher Library",
                       "isWarm": false,
                       "wasVisited": false,
                    },
                   "randall": {
                       "message": "If it's snowing outside, try walking through the covered archway cutting through Randall to take a break from the blizzard.",
                       "display_name": "Randall Hall",
                       "isWarm": false,
                       "wasVisited": false,
                   },
                   "chem": {
                       "message": "The Chem Building has a ceiling full of skylights, so you can enjoy a sunny day even if it's cold outside!",
                       "display_name": "Chemistry Building",
                       "isWarm": false,
                       "wasVisited": false,
                    },
                   "umma": {
                       "message": "Need a break from walking outside? Check out the art exhibitions inside -- it's totally free!! If you'd rather sit, try a hot drink from the UMMA Cafe.",
                       "display_name": "University of Michigan Museum of Art",
                       "isWarm": false,
                       "wasVisited": false,
                    },
                   "ugli": {
                       "message": "The Ugli is open 24 hours a day, so you can always pop in to get warm and/or pull all-nighters, depending on how unfortunate you are.",
                       "display_name": "Shapiro Undergraduate Library",
                       "isWarm": true,
                       "wasVisited": false,
                    },
                    "west hall": {
                        "message": "Ever seen a wave pool? Come to the Marine Hydrodynamics Laboratory (MHL) in this building to check one out.",
                        "display_name": "West Hall",
                        "isWarm": false,
                        "wasVisited": false,
                    },
                    "league": {
                         "message": "Pick up some hot soup or coffee from Maizie's Cafe to help you warm up! If you're looking to get away from your roomies, this building also houses a well-hidden hotel on its top floor.",
                         "display_name": "League",
                         "isWarm": true,
                         "wasVisited": false,
                    },
                    "union": {
                        "message": "Cozy up by the beautiful fireplace in the lobby with a gourmet meal from Panda Express, Subway or Taco Bell (your choice!).",
                        "display_name": "Union",
                        "isWarm": true,
                        "wasVisited": false,
                    },
                    "east hall": {
                        "message": "The Math Atrium is a great place to study for people of all majors. Need help with your math homework? Head right downstairs to the MathLab!",
                        "display_name": "East Hall",
                        "isWarm": false,
                        "wasVisited": false,
                    },
                    "weiser": {
                        "message": "Recently renovated, this building offers some great study spots. Head up to the higher floors to see beautiful views of campus and surrounding Ann Arbor.",
                        "display_name": "Weiser Hall",
                        "isWarm": false,
                        "wasVisited": false,
                    },
                    "south quad": {
                        "message": "It's a long trek to the Big House...Stop by South Quad on your way there or back to take a break from the cold and maybe grab a snack from JavaBlu or the dining hall.",
                        "display_name": "South Quad",
                        "isWarm": true,
                        "wasVisited": false,
                    },
                    "east quad": {
                        "message": "There's always plenty to do at East Quad: grab a meal from the dining hall, catch a show at the Keene Theater, or reminisce with friends from Orientation.",
                        "display_name": "East Quad",
                        "isWarm": true,
                        "wasVisited": false,
                    },
                    "west quad": {
                        "message": "Did you know West Quad is connected to the Union? You can study in the beautiful halls and sitting rooms, then pop on over to Panera or Taco Bell for a study break!",
                        "display_name": "West Quad",
                        "isWarm": true,
                        "wasVisited": false,
                    },
                    "north quad": {
                        "message": "It's quite possible that you could live, dine, and learn in this building, since it is a residence hall with both a dining hall and classrooms. No need to ever go outside!",
                        "display_name": "North Quad",
                        "isWarm": true,
                        "wasVisited": false,
                    },
                    "law": {
                        "message": "This magical building is a great place to get motivated and study hard. Check out the Law Atrium to get some sunlight while you're studying to really stay warm.",
                        "display_name": "Law Library",
                        "isWarm": false,
                        "wasVisited": false,
                    },
                    "ross": {
                        "message": "While this building is well-known for its 'Winter Garden,' don't let this name deter you from meeting with friends or study groups in this building!",
                        "display_name": "Ross School of Business",
                        "isWarm": true,
                        "wasVisited": false,
                    },
                    "seb": {
                        "message": "Looking for a new study spot? Check out the Brandon Center in this building for a new place to grind.",
                        "display_name": "School of Education Building",
                        "isWarm": false,
                        "wasVisited": false,
                    },
                    "lorch": {
                        "message": "If you're a prospective Econ major, get ready to spend lots of time here, as it houses Michigan's Econ department.",
                        "display_name": "Lorch Hall",
                        "isWarm": false,
                        "wasVisited": false,
                    },
                    "mlb": {
                        "message": "Stop in for a class, get lost for a lifetime! It's very easy to get disoriented in the circular hallways of the MLB (but at least you'll be warm!).",
                        "display_name": "Modern Languages Building",
                        "isWarm": false,
                        "wasVisited": false,
                    },
                    "lsa": {
                        "message": "Another newly renovated spot on campus, this building now has a beautiful window wall and it's a great place to grab a table for a study group.",
                        "display_name": "LSA Building",
                        "isWarm": false,
                        "wasVisited": false,
                    },

                }

const RESET_VISITED_BUILDINGS = function() {
    let bldg_list = Object.keys(BUILDINGS);
    for (idx in bldg_list) {
        console.log(bldg_list[idx]);
        BUILDINGS[bldg_list[idx]]["wasVisited"] = false;
    }
}