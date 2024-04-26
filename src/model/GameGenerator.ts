import { Group } from "./Group";
import { Tile } from "./Tile";

interface WordCollection{
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
    private groups = [Group.BLUE, Group.ORANGE, Group.PINK, Group.YELLOW];
    private collection : WordCollection[] = data;
    private tiles! : Tile[];


    public GameGenerator(){
        this.initGame();
        console.log("End of game generator constructor");
    }

    public getTiles(){
        console.log("Called get tiles");
        if(this.tiles == null){
            this.initGame();
        }
        return this.tiles;
    }

    // Change id????
    private initGame(){
        console.log("Called initGame model");
        var tmp : Tile[] = [];
        var id = 0;
        var groupIndex = 0;

        this.collection.forEach(collection => {
            collection.words.forEach(word => {
                const tile : Tile = new Tile(word, collection.connection, this.groups[groupIndex], id.toString());
                tmp.push(tile);
                id++;
            });
            groupIndex++;
        });

        // Should shuffle

        
        this.tiles = [...tmp];
    }



    
    
}