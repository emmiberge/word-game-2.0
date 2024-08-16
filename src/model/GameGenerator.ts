import { ShufflingService } from "../services/shuffling.service";
import { Group } from "./Group";
import { Tile } from "./Tile";

export interface WordCollection{
    words : string[],
    connection : string
}




const data : WordCollection[] = [
    {words : ["Cat", "Dog", "Horse", "Hamster"],
    connection : "Animals"},
    {words : ["Cake", "Pudding", "Tiramisu", "Ice cream"],
    connection : "Desserts"},
    {words : ["Circle", "Square", "Rectangle", "Triangle"],
    connection : "Shapes"},
    {words : ["Fire", "Water", "Earth", "Wind"],
    connection : "Elements"}
]

/*
    A factory for generating words for a game
*/
export class GameGenerator{
    private groups = [Group.BLUE, Group.PURPLE, Group.PINK, Group.YELLOW];
    private collection : WordCollection[] = data;
    private tiles! : Tile[];
    private amountOfTiles = 16;


    public GameGenerator(){
        this.initGame();
        //console.log("End of game generator constructor");
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
        connection : "Super ___"};
    }
    

    // Change id????
    private initGame(){
        console.log("Called initGame model");
        var tmp : Tile[] = [];
        var groupIndex = 0;
        var indexId = 0;
        var indexArr : number[] = Array.from({length: this.amountOfTiles}, (_, i) => {
            return i;
          });

        indexArr = ShufflingService.shuffle(indexArr);

        console.log(this.collection);
        console.log(indexArr);

        this.collection.forEach(collection => {
            collection.words.forEach(word => {
                const tile : Tile = new Tile(word.toUpperCase(), collection.connection, this.groups[groupIndex], indexArr[indexId].toString());
                tmp.push(tile);
                indexId++;
            });
            groupIndex++;
        });

        // Should shuffle

        
        this.tiles = ShufflingService.shuffle(tmp);
        console.log(this.tiles);
    }


    

    



    
    
}