import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import {ICar} from "./ICar"

let carUrl : string = "https://webapicar20190326034339.azurewebsites.net/api/cars"

let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("carsList");
let GetAllCarsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("showCarsButton");
GetAllCarsButton.addEventListener('click', getAllCars)

function getAllCars():void
{
    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function (response: AxiosResponse<ICar[]>) : void
    {
        console.log("are in then");
        console.log(response);

        // let result: string = "<ol>" 
         //remove all the li elements one by one
    while (ContentElement.firstChild) {
        ContentElement.removeChild(ContentElement.lastChild);
    }
        response.data.forEach((car: ICar) => {
            let newNode:HTMLLIElement = AddLiElement(car.model + " " +car.vendor+ " "+car.price);
            ContentElement.appendChild(newNode);
        });
               
    })
    .catch(
        function (error:AxiosError) : void{
            console.log("Error in the typescript code");
            console.log(error);
        }
    )    
    console.log("At the end in the showAllCars function");
}


function AddLiElement(text:string):HTMLLIElement {
    let newLi:HTMLLIElement = document.createElement('li');
    let newTextNode:Text = document.createTextNode(text)
    newLi.appendChild(newTextNode);
            // list.appendChild(newLi);
    return newLi;
}
