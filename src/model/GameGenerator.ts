import { ShufflingService } from "../services/shuffling.service";
import { Group } from "./Group";
import { Tile } from "./Tile";

export interface WordCollection{
    words : string[],
    group : Group,
    connection : string
}




const simpleExample : WordCollection[] = [
    {words : ["Cat", "Dog", "Horse", "Hamster"],
    connection : "Animals",
    group : Group.BLUE
    },
    {words : ["Cake", "Pudding", "Tiramisu", "Ice cream"],
    connection : "Desserts",
    group : Group.YELLOW},
    {words : ["Circle", "Square", "Rectangle", "Triangle"],
    connection : "Shapes",
    group : Group.PURPLE},
    {words : ["Fire", "Water", "Earth", "Wind"],
    connection : "Elements",
    group : Group.PINK}
];

const realisticExample : WordCollection[] = [
    {words : ["Note", "Scale", "Chord", "Key"],
    connection: "Related to music",
    group : Group.BLUE},
    {words: ["Polar", "Brown", "Black", "Panda"],
    connection: "Types of bears",
    group : Group.YELLOW},
    {words : ["Cream", "Berg", "Skate", "Breaker"],
    connection: "Starts with Ice",
    group : Group.PURPLE},
    {words : ["Season", "Cycle", "Stage", "Age"],
    connection: "Periods of time",
    group : Group.PINK}
]

const realisticExample2 : WordCollection[] = [
    {words: ["Ash", "Walnut", "Maple", "Pine"],
    connection: "Types of trees",
    group : Group.BLUE},
    {words : ["Cover", "Shelter", "Barrier", "Insurance"],
    connection: "Protection",
    group : Group.PURPLE},
    {words: ["Chest", "Safe", "Vault", "Locker"],
    connection: "For safekeeping",
    group : Group.PINK},
    {words: ["Fly", "Fighter", "Truck", "Work"],
    connection: "Starts with fire",
    group : Group.YELLOW}
]

const data = [simpleExample, realisticExample, realisticExample2];

/*
    A factory for generating words for a game
*/
export class GameGenerator{
    private collection! : WordCollection[];
    private tiles! : Tile[];
    private amountOfTiles = 16;


    public GameGenerator(){
        this.initGame();
        //console.log("End of game generator constructor");
    }

    private initGame(){
        this.initWordCollection();

        // Create tiles with unique ids from our WordCollection 
        var tmp : Tile[] = [];
        var indexId = 0;

        this.collection.forEach(collection => {
            collection.words.forEach(word => {
                const tile : Tile = new Tile(word.toUpperCase(), collection.connection, collection.group, indexId.toString());
                tmp.push(tile);
                indexId++;
            });
        });

        // Shuffle tiles 
        this.tiles = ShufflingService.shuffle(tmp);
        console.log(this.tiles);
    }

    private initWordCollection(){
        const index : number = Math.floor(Math.random() * data.length);
        this.collection = data[index];
    }

    public getTiles(){
        console.log("Called get tiles");
        if(this.tiles == null){
            this.initGame();
        }
        return this.tiles;
    }

    public static getExampleWordCollection() : WordCollection{
        return {words : ["Nova", "Star", "Market", "Hero"],
        connection : "Super ___",
        group : Group.BLUE};
    }
    

   
    
    // Convert a list of tiles into a word collection
    public tilesToWordCollection(arr : Tile[]): WordCollection{
        // Check that we have exactly four tiles and that they are all in the same group
        if(arr.length != 4){
            throw new RangeError("Wrong amount of tiles submitted");
        }

        const allTilesSameGroup = arr.every(t => t.getGroup() === arr[0].getGroup());

        if(!allTilesSameGroup){
            throw new Error("Tiles of different groups");
        }

        // Convert
        const wordsArr : string[] = arr.map(t => t.getWord());
        return {words: wordsArr, connection: arr[0].getConnection(), group: arr[0].getGroup()}
    }





    

    



    
    
}