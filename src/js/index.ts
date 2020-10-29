import axios,{
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index"
import {ICar} from "./ICar"

let carUrl : string = "https://webapicar20190326034339.azurewebsites.net/api/cars"

let ContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("carsList");

//show all cars
let GetAllCarsButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("showCarsButton");
GetAllCarsButton.addEventListener('click', getAllCars)

//add a new car
let AddCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
AddCarButton.addEventListener('click',addCar);

//delete a car
let deleteCarButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
deleteCarButton.addEventListener('click',deleteCar);


//show all cars button function
function getAllCars():void
{
    axios.get<ICar[]>("https://webapicar20190326034339.azurewebsites.net/api/cars")
    .then(function (response: AxiosResponse<ICar[]>) : void
    {
        console.log("are in then");
        console.log(response);

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
    return newLi;
}

//add a new car to list button function
function addCar():void{
    let addModelelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addModel");
    let addVendorelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addVendor");
    let addPriceelement: HTMLInputElement = <HTMLInputElement> document.getElementById("addPrice");

    let myModel : string = addModelelement.value;
    let myVendor: string = addVendorelement.value;
    let myPrice : number = +addPriceelement.value;  

    axios.post<ICar>("https://webapicar20190326034339.azurewebsites.net/api/cars",
                    {model:myModel,vendor:myVendor,price:myPrice})
                    .then(function (response :  AxiosResponse): void
                    {
                        console.log("Statuscode is :" + response.status);
                    })
                    .catch(
                        function (error:AxiosError) : void{                          
                            console.log(error);
                        }
                    )                   

}

//delete car from list button function
function deleteCar():void{

    //finds the id for the car to delete
    let delCarIdElement: HTMLInputElement = <HTMLInputElement> document.getElementById("deleteCarId");
    let myCarId : number = +delCarIdElement.value;
    
    let deleteContentElement: HTMLDivElement = <HTMLDivElement> document.getElementById("deletecontent");

axios.delete("https://webapicar20190326034339.azurewebsites.net/api/cars/"+myCarId
)
.then((response :  AxiosResponse): void => {
        console.log("Car is deleted ");
        console.log("Statuscode is :" + response.status);
        deleteContentElement.innerHTML = "car is deleted";
})
.catch(
    (error:AxiosError) : void => {                          
        console.log(error);
        deleteContentElement.innerHTML = "Error: the car is NOT deleted, look at the console";
    });
}

