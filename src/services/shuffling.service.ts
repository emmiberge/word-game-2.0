import { Injectable } from "@angular/core";

@Injectable()
export class ShufflingService{

    public static shuffle<T>(arr : T[]) : T[]{
        var tmp = [...arr];

        for (let i = tmp.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [tmp[i], tmp[j]] = [tmp[j], tmp[i]]; 
          } 
        
        return tmp; 
    }
}