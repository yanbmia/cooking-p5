let start,startHover,letter,letterHover, letterOpen,selectStore,doorHover,dessertStoreFront,dessertStoreBack,dayEnd,homeHover,nextDayHover;;
let orderBubble,patienceGreen,patienceYellow,patienceRed;
let trashImg,trashOpenImg;
let trashOpened=false;
let state = 1; //1 = main screen, 1.5 = letter, 2 = select shop, 3 = dessertStore;
let day;
let letterTime;
let coins = 0;
let tempCustomer, char1;
let maxPatience = 3000;
let displayPatience = true;

//audio
let door;
let coinsound;
let correct;
let wrong;
let timer;
let ice;
let blenderSound;


let dayStartTime = 0;
let dayDuration = 60 * 1000;
let customersServedToday = 0;
let moneyEarnedToday = 0;

//THIS JAVASCRIPT VERSION HAS IMPLEMENTED CUPCAKE STACK LOGIC!!!!

// arrays for displaying and checking items easily
let displayable = [];
let draggable = [];
let sources = [];
let currDocks = [];
let served = [];

// blender state variable
let blenderImg = null;
let blenderSrc;

// imgs object 
let imgs = {};
let customerImages = [];

// dragging state variables
let dragMode = false;
let dragObject = null;


let masterObject =[];
masterObject[0] = ['cupcake','drink'];
masterObject[1] = ['baseChoco','baseMarble','baseVanilla'];
masterObject[2] = ['frostingChocolate', 'frostingLemon','frostingStrawberry'];
masterObject[3] = ['cherry','oreoTopping','sprinklesTopping'];
masterObject[4] = ['strawberry','orange','coffee','matcha'];
// coffee / matcha / straberry orange

let orderServed = false;
let recipe1;
let leaveMode = false;
let customerLeave = false;


// cupcake stack order management
let baseStacked = false;
let frostingStacked = false;
let toppingStacked = false;


let cupStacked = false;
let drinkStacked = false;


let leaveDelay =0;
let isCalculated = false;
let perfectScore = 0;

let cupcakeWant = true;
let finalServed;
let tempServed;

function preload(){
    start = loadImage("images/start_screen.png");
    letter = loadImage("images/letter.jpg");
    letterHover = loadImage("images/letter_hover.jpg")
    letterOpen = loadImage("images/letterOpen.jpg");
    startHover = loadImage("images/start_hover.png");
    selectStore = loadImage("images/dessertStoreOut.jpg");
    doorHover = loadImage("images/door_hover.png");
    dessertStoreFront = loadImage("images/dessertStoreIn_front.png");
    dessertStoreBack = loadImage("images/dessertStoreIn_back.jpg");
    orderBubble = loadImage("images/orderBubble.png");
    orderWrong = loadImage("images/orderWrong.png");
    orderCorrect = loadImage("images/orderCorrect.png");

    patienceGreen = loadImage("images/patienceGreen.png");
    patienceYellow = loadImage("images/patienceYellow.png");
    patienceRed = loadImage("images/patienceRed.png");
    char1 = loadImage("images/char1.png");
    dayEnd = loadImage("images/endOfDay.jpg");
    nextDayHover = loadImage("images/nextDay_hover.png");
    homeHover = loadImage("images/home_hover.png");

    trashImg = loadImage("images/trash.png");
    // trashOpenImg = loadImage("imgaes/trash_open.png");
    
    //load sounds
    soundFormats('mp3', 'wav');
    //bgm = loadSound('sounds/bgm.mp3');
    door = loadSound('sounds/doorbell.wav')
    coinsound = loadSound('sounds/coins.wav');
    correct = loadSound('sounds/correct.mp3');
    wrong = loadSound('sounds/wrong.wav');
    timer = loadSound('sounds/timer.mp3');
    ice = loadSound('sounds/ice.mp3');
    blenderSound = loadSound('sounds/blender.mp3');

    // load in food images
    imgs.baseVanilla = loadImage('foodItems/cupcakeBaseVanilla.png')
    imgs.cupcakeVanilla = loadImage('foodItems/cupcakeVanilla.png')
    imgs.baseChoco = loadImage('foodItems/cupcakeBaseChocolate.png')
    imgs.cupcakeChoco = loadImage('foodItems/cupcakeChocolate.png')
    imgs.baseMarble = loadImage('foodItems/cupcakeBaseMarble.png')
    imgs.cupcakeMarble = loadImage('foodItems/cupcakeMarble.png')
    imgs.frostingStrawberry = loadImage('foodItems/frostingStrawberry.png')
    imgs.frostingChocolate = loadImage('foodItems/frostingChocolate.png')
    imgs.frostingLemon = loadImage('foodItems/frostingLemon.png')
    imgs.cherry = loadImage('foodItems/toppingCherry.png');
    imgs.oreo = loadImage('foodItems/toppingOreo.png');
    imgs.sprinkles = loadImage('foodItems/toppingSprinkles.png');

    //load in drink images
    imgs.orange = loadImage('foodItems/orange.png');
    imgs.strawberry = loadImage('foodItems/strawberry.png');
    imgs.baseCoffee = loadImage('foodItems/baseCoffee.png');
    imgs.baseMatcha = loadImage('foodItems/baseMatcha.png');
    imgs.blenderOrange = loadImage('images/blenderOrange.png');
    imgs.blenderSmoothie = loadImage('images/blenderSmoothie.png');
    imgs.blenderMatcha = loadImage('images/blenderMatcha.png');
    imgs.blenderCoffee = loadImage('images/blenderCoffee.png');
    imgs.cup = loadImage('foodItems/cup.png');
    
    imgs.dropOrange = loadImage('foodItems/dropOrange.png');
    imgs.dropSmoothie = loadImage('foodItems/dropSmoothie.png');
    imgs.dropMatcha = loadImage('foodItems/dropMatcha.png');    
    imgs.dropCoffee = loadImage('foodItems/dropCoffee.png');    

    imgs.drinkOrange = loadImage('foodItems/drinkOrange.png');
    imgs.drinkSmoothie = loadImage('foodItems/drinkSmoothie.png');
    imgs.drinkMatcha = loadImage('foodItems/drinkMatcha.png');
    imgs.drinkCoffee = loadImage('foodItems/drinkCoffee.png');

    imgs.smalldrinkOrange = loadImage('foodItems/smalldrinkOrange.png');
    imgs.smalldrinkSmoothie = loadImage('foodItems/smalldrinkSmoothie.png');
    imgs.smalldrinkMatcha = loadImage('foodItems/smalldrinkMatcha.png');
    imgs.smalldrinkCoffee = loadImage('foodItems/smalldrinkCoffee.png');







  // load in small food images for order bubble

  imgs.smallcupcakeVanilla = loadImage('foodItems/smallcupcakeVanilla.png')
  imgs.smallcupcakeChoco = loadImage('foodItems/smallcupcakeChocolate.png')
  imgs.smallcupcakeMarble = loadImage('foodItems/smallcupcakeMarble.png')

  imgs.smallfrostingStrawberry = loadImage('foodItems/smallfrostingStrawberry.png')
  imgs.smallfrostingChocolate = loadImage('foodItems/smallfrostingChocolate.png')
  imgs.smallfrostingLemon = loadImage('foodItems/smallfrostingLemon.png')

  imgs.smallcherry = loadImage('foodItems/smalltoppingCherry.png');
  imgs.smalloreo = loadImage('foodItems/smalltoppingOreo.png');
  imgs.smallsprinkles = loadImage('foodItems/smalltoppingSprinkles.png');

  for(let i=1;i<9;i++){
    let tempHaha = loadImage('customers/customer'+i+'.png');
    customerImages.push(tempHaha);
  }
  // console.log('is this created properly?',customerImages);
}

function setup(){
    canvas = createCanvas(900, 600);
    canvas.parent("#game");
    background(255);

    let savedDay = localStorage.getItem('day');
    if (savedDay === null) {
      day = -1;
      }else{
        day = int(savedDay);
      }
    
    let savedCoins = localStorage.getItem('coins');
    if (savedCoins === null) {
      coins = 0; 
    } else {
      coins = int(savedCoins); 
    }
    
    recipe1 = new Recipe();
    tempCustomer = new Customer(379,40,recipe1);
   
    // setup for state 3 (gameplay)

    blender = new Item(752, 205, 47, "blender", null);

    orderZone = new Item(590,150, 125, "orderZone", null);
    trashZone = new Item(150,650,300, "trashZone", null)
    currDocks.push(orderZone);
    currDocks.push(trashZone);

    station = new Item(width/2, 300, 250, "station", null);
    currDocks.push(station);

    let cherries = new Source(141,377,20,null,0, 'cherry', imgs.cherry, null, currDocks);
    sources.push(cherries);

    let baseVanilla = new Source(9,266,100,22,1, 'baseVanilla', imgs.baseVanilla, imgs.cupcakeVanilla, currDocks)
    sources.push(baseVanilla)

    let baseChoco = new Source(55,300,100,22,1, 'baseChoco', imgs.baseChoco, imgs.cupcakeChoco, currDocks)
    sources.push(baseChoco)

    let baseMarble = new Source(0,333,90,22,1, 'baseMarble', imgs.baseMarble, imgs.cupcakeMarble, currDocks)
    sources.push(baseMarble)

    let frostingStrawberry = new Source(180,332,20,null,0,'frostingStrawberry', imgs.frostingStrawberry, null, currDocks)
    sources.push(frostingStrawberry)

    let frostingChocolate = new Source(249,332,20,null,0, 'frostingChocolate', imgs.frostingChocolate, null, currDocks)
    sources.push(frostingChocolate)

    let frostingLemon = new Source(212,341,20,null,0, 'frostingLemon', imgs.frostingLemon, null, currDocks)
    sources.push(frostingLemon)

    let oreoTopping = new Source(240,378,20,null,0, 'oreoTopping', imgs.oreo, null, currDocks)
    sources.push(oreoTopping)

    let sprinklesTopping = new Source(190,381,20,null,0, 'sprinklesTopping', imgs.sprinkles, null, currDocks)
    sources.push(sprinklesTopping)

    let oranges = new Source(723,363,47,null,0, "Orange", imgs.orange, null, [orderZone, station, blender, trashZone]);
    sources.push(oranges);

    let strawberries = new Source(842,366,47,null,0, "Smoothie", imgs.strawberry, null, [orderZone, station, blender, trashZone]);
    sources.push(strawberries);

    let matcha = new Source(734, 489, 30, null,0, "Matcha", imgs.baseMatcha, null, [orderZone, station, blender, trashZone]);
    sources.push(matcha);

    let coffee = new Source(800, 492, 30, null,0, "Coffee", imgs.baseCoffee, null, [orderZone, station, blender, trashZone]);
    sources.push(coffee);

    let cup = new Source(619,309,45,73,1, "cup", imgs.cup, null, [orderZone, station, trashZone]);
    sources.push(cup);

    blenderSrc = new Source(752, 205, 47, null,0, "blender", null, null, [orderZone, station, trashZone]);
    sources.push(blenderSrc);

   /*userStartAudio().then(() => {
    bgm.loop();
    bgm.setVolume(0.5);
  });

*/
}

function draw(){
  
    if (state == 1){
        drawStartScreen();
    }else if (state == 1.5){
      letterScreen();
      letterTime = 0
    }else if (state == 1.6){
      if (letterTime == 0){
         letterTime = millis();}
         
      image(letterOpen,0,0);

      if(millis() - letterTime >= 4000){
         text("Press ENTER", 740,545);
         text("to continue. . .",740,570);
      }

      if(keyIsDown(13)){
        state = 2;
        day = 1;
      }
    }
    else if (state == 2){
        selectStoreScreen();
    }else if (state == 3){ //dessertStoreIn
        let elapsedTime = millis() - dayStartTime;
        if (elapsedTime > dayDuration) {
          state = 4;



          // Is this where day changes?
          return;
        }
        
        cursor(ARROW);
        imageMode(CORNER);
        image(dessertStoreBack,0,0);
        textSize(40);
        fill(255);
        text("Day: " + day,80, 80);
        text(coins, 780, 70);

       

        // console.log(tempCustomer);
        tempCustomer.display();
        tempCustomer.update();

        image(dessertStoreFront,0,0,900,600);

        //Cupcake bake
        // if(holdingBase && mouseX>367 && mouseX<553 && mouseY < 535 && mouseY > 500){
        //                 console.log('Baking...');
        //                 bakeTime+=1;
        //                 if(bakeTime>50 && !cupcakeBaked){
        //                   cupcakeBaked=true;
        //                   console.log('Done baking');
        //                 }
        //               }
                      


        //trashbin image 
        image(trashImg,0,0,900,600)




        if(millis()%60==0){ // cogus
        // console.log("####COGUS COGUS COGUS COGUS COGUS####");
          // console.log("DRAG",draggable.map(item => item.name));
          

        }

        

        let timeLeft = (dayDuration - elapsedTime) / 1000;
        textSize(24);
        if (timeLeft > 10){
          fill(255);
          text(ceil(timeLeft),835,580);
        }else{
          fill(194,46,52);
          text(ceil(timeLeft),835,580);
          if (!timer.isPlaying()){
            timer.play();
          }
        }

        // update blender images 

        if (blenderImg != null) {
          image(imgs["blender" + blenderImg],0,0)
          blenderSrc.imgSrc = imgs["drop" + blenderImg];
          blenderSrc.altImg = imgs["drink" + blenderImg];
        }



        //krispy
          // Map displayable array to get just the names
        if (millis()%2==0){
          tempCustomer.served = displayable.map(item => item.name); //asked chatgpt to help map items to item.name(extracting the name from object)
          tempServed = tempCustomer.served;
          // console.log('Items in served array:', tempCustomer.served);
          // console.log('help',tempCustomer.served);
          if(tempCustomer.served.length==0){
            //nothing is stacked
              }
          if(tempCustomer.served[0]=='baseChoco'||tempCustomer.served[0]=='Vanilla'||tempCustomer.served[0]=='baseMarble'){
            // console.log('base stacked');
            baseStacked = true;}
          if(tempCustomer.served[1]=='frostingChocolate' || tempCustomer.served[1]=='frostingLemon'||tempCustomer.served[1]=='frostingStrawberry'){
            // console.log('frosting stacked')
            frostingStacked = true;}
          if(tempCustomer.served[2]=='cherry'||tempCustomer.served[2]=='oreoTopping'||tempCustomer.served[2]=='sprinklesTopping'){
            toppingStacked = true;}
            // console.log('this is our topping:',tempCustomer.served[2]);
        }

         // console.log('what is this:',draggable);
          

        if(tempCustomer.served[0]=='cup'||tempCustomer.served[1]=='cup'){
          // console.log('####cup is here!');
          cupStacked = true;
        } else{ cupStacked= false; }


        //served order to customer
        if(orderServed){
          
          

          if(!isCalculated) // calculate score runs once
            {let score = calculateScore(tempCustomer);
            
            if (perfectScore == 3) {
                console.log('order correct');
                tempCustomer.orderBubbleImage = orderCorrect;
 // order right
            if (correct && !correct.isPlaying()) {
              correct.play();
            }
  //play coin sound when they earn coins
          if (coinsound && !coinsound.isPlaying()) {
            coinsound.play();
            }





} else {
  console.log('order wrong');
  tempCustomer.orderBubbleImage = orderWrong;

  //order wring
  if (wrong && !wrong.isPlaying()) {
    wrong.play();}
}

//end of millis?


            perfectScore = 0;//reset perfect score
            // console.log('@@@You earned:', score);
            isCalculated = true;}


          leaveDelay+=1;
          
          // leaveMode = true;
          if(leaveDelay>70) //give some time for order bubble to display
          {orderServed = false;
          tempCustomer.popDown();
          leaveDelay = 0; //reset leave Delay
          displayPatience = false;
          calculatePerfect = false;
          isCalculated = false;
           //if leave delay end
          }
        }
 
        // 511 376


    }else if (state ==4){
      localStorage.setItem('day', day)
      timer.stop();
      clear();
      drawEndScreen();



      // krispy finale

    }

     if (mouseIsPressed){
 
        if(state==2)
        {tempCustomer.popUp()} 

        if (!dragMode) {
            for (let source of sources) {
                if (source.contains()) {

                  if (source == blenderSrc && blenderSrc.imgSrc != null) {
                    if (ice && !ice.isPlaying()) {
                      ice.play();
                    }
                  }

                  // to prevent multiple stacking, i asked chatgpt how to do it
                  // it told me to use continue; in side if statement
                  if(source.name=='cup'&&cupStacked){
                    continue; //skip creating draggable when we already have cup // HERE HERE HERE HERE 
                  }

                  //Here
                  if (source.name.startsWith('base') && baseStacked) {
                        continue; // Skip creating draggable if a base is already stacked   
                    }else if(source.name.startsWith('base')){
                      baseStacked = true;
                    }
                    

                    if (source.name.startsWith('frosting') && (frostingStacked||!baseStacked)) {
                        continue; // Skip creating draggable if a base is already stacked
                
                    } else if(source.name.startsWith('frosting')){
                      frostingStacked = true;
                    }
                    

                    if ((source.name=='cherry'||source.name=='oreoTopping'||source.name=='sprinklesTopping') && (toppingStacked||!baseStacked||!frostingStacked) ) {
                      console.log('HAHAHAHAHAHA never think about it');
                        continue; // Skip creating draggable if a base is already stacked
                    
                    } else if(source.name.startsWith('topping')){
                      toppingStacked = true;
                    }
                   


                    //create new draggable and attach to arrs
                    let dragItem = new Draggable(mouseX, mouseY, source.width, source.name, source.imgSrc, source.altImg, station.itemObjs.concat([station, orderZone, trashZone]));
                    if (source.name == "Orange" || source.name == "Smoothie" || source.name == "Matcha" || source.name == "Coffee") {
                        dragItem = new Draggable(mouseX, mouseY, source.width, source.name, source.imgSrc, source.altImg, station.itemObjs.concat([station, orderZone, blender, trashZone]));
                    }
                    else {
                        dragItem = new Draggable(mouseX, mouseY, source.width, source.name, source.imgSrc, source.altImg, station.itemObjs.concat([station, orderZone, trashZone]));
                    }
                    displayable.push(dragItem);
                    draggable.push(dragItem);
                }
            }
            for (let drag of draggable) {
            if(drag.contains(mouseX,mouseY))
                {dragObject = drag;
                    dragMode = true;

                   
                    break;
            }}
            
        }
        
        if(dragMode) {
            dragObject.drag();
        }
     }
    if (blender.items.length != 0) {
      blenderImg = blender.items[0];
      blenderSrc.name = blenderImg;
      // console.log("blender objs", blender.itemObjs)
      blender.itemObjs.splice(0, 1);
      blender.items.splice(0, 1);
      draggable.splice(draggable.indexOf(blender.itemObjs[0]), 1);
      displayable.splice(displayable.indexOf(blender.itemObjs[0]), 1);
      // displayable.splice(displayable.indexOf(blender.itemObjs[0]), 1);
    }

    let bases = [];
    let frostings = [];
    let toppings = [];
    let others = [];
    let name; 
    for (let display of displayable) {
      if (display && display.name){
        name = String(display.name);
      }else{name =''}
      let lname = name.toLowerCase();
      if (lname.startsWith('base') || lname.startsWith('cupcake')) {
        bases.push(display);
      } else if (lname.startsWith('frosting')) {
        frostings.push(display);
      } else if (lname === 'cherry' || lname.includes('topping')) {
        toppings.push(display);
      } else {
        others.push(display);
      }
    }
    
    const drawOrder = bases.concat(frostings, others, toppings);
    for (let display of drawOrder) {
      push();
      imageMode(CENTER);
      display.displayAndDraw();
      display.itemsIncluded();
      pop();
    }
    }


function mouseReleased() {
    dragMode = false;
    for (drag of draggable) {
        if (drag.contains(mouseX, mouseY)) {
            if (drag.altImg != null) {
                drag.imgSrc = drag.altImg;
            }
            drag.dock();
        }
    }
}

function drawStartScreen(){
    imageMode(CORNER);
    cursor(ARROW);
    image(start,0,0);

    let buttonX = 311;
    let buttonY = 297;
    let buttonW = 300;
    let buttonH = 90;

     if (
    mouseX > buttonX &&
    mouseX < buttonX + buttonW &&
    mouseY > buttonY &&
    mouseY < buttonY + buttonH
  ) {
    image(startHover, 0, 0, width, height);
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function letterScreen(){
  image(letter,0,0);
  cursor(ARROW);
  fill(255);
  textSize(20);
  textFont("matt-b");
  text("Looks like you received a mysterious letter, click to open", 200, 560)

  let letterX = 64;
  let letterY = 100;
  let letterW = 740;
  let letterH = 360;

     if (
    mouseX > letterX &&
    mouseX < letterX + letterW &&
    mouseY > letterY &&
    mouseY < letterY + letterH
  ) {
    
    image(letterHover, 0, 0, width, height);
    text("Looks like you received a mysterious letter, click to open", 200, 560)

    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function selectStoreScreen(){
  imageMode(CORNER);
  cursor(ARROW);
  image(selectStore,0,0);
  textSize(40);
  textFont("matt-b");
  text("Day: " + day,80, 80);
  text(coins, 780, 70);

    let doorX = 417;
    let doorY = 341;
    let doorW = 110;
    let doorH = 160;

     if (
    mouseX > doorX &&
    mouseX < doorX + doorW &&
    mouseY > doorY &&
    mouseY < doorY + doorH
  ) {
    image(doorHover, 0, 0, width, height);
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}

function drawEndScreen(){
  
  // remove all draggables/displayables on screen before new day
  for (d of displayable) {
    displayable.splice(displayable.indexOf(this), 1);
  }
  for (drag of draggable) {
    draggable.splice(draggable.indexOf(this), 1);
  }
  blenderSrc.imgSrc = null;

  imageMode(CORNER);
  cursor(ARROW);
  image(dayEnd,0,0);

  fill(55,48,40);
  textSize(40);
  text("Day " + day, 395,173);
  textSize(26);
  text("Customers Served: " + customersServedToday, 330,295);
  text("Total Coins Earned: " + moneyEarnedToday, 330,407);

    let nextDX = 589;
    let nextDY = 443;
    let nextDW = 283;
    let nextDH = 114;

    let homeX = 46;
    let homeY = 449;
    let homeW = 129;
    let homeH = 114;

     if (
    mouseX > nextDX &&
    mouseX < nextDX + nextDW &&
    mouseY > nextDY &&
    mouseY < nextDY + nextDH
  ) {
    image(nextDayHover, 0, 0, width, height);
    cursor(HAND);
}else{cursor(ARROW);}

  if(
    mouseX > homeX &&
    mouseX < homeX + homeW &&
    mouseY > homeY &&
    mouseY < homeY + homeH
){
  image(homeHover, 0, 0, width, height);
  cursor(HAND);
}else{cursor(ARROW);}
}

function startNewDay() {
  day += 1;
  localStorage.setItem('day', day);
  
  state = 3;
  dayStartTime = millis(); 
  customersServedToday = 0; 
  moneyEarnedToday = 0;
  
  tempCustomer.resetForNewOrder();
  console.log("this is for new customer",tempCustomer.patience);
  console.log("Starting Day " + day);
}

function mousePressed() {
  userStartAudio();
  if (state == 1){
    let buttonX = 311;
    let buttonY = 297;
    let buttonW = 300;
    let buttonH = 90;

    if (
      mouseX > buttonX &&
      mouseX < buttonX + buttonW &&
      mouseY > buttonY &&
      mouseY < buttonY + buttonH
    ) {
      if (day < 0){
      state = 1.5;
    }else{
      state = 2;}
  }
  }
  else if (state == 1.5){
   let letterX = 64;
   let letterY = 100;
   let letterW = 740;
   let letterH = 360;

     if (
    mouseX > letterX &&
    mouseX < letterX + letterW &&
    mouseY > letterY &&
    mouseY < letterY + letterH
  ) {
    state = 1.6;
  }
    }else if(state == 2){
    let doorX = 417;
    let doorY = 341;
    let doorW = 110;
    let doorH = 160;

     if (
  mouseX > doorX &&
  mouseX < doorX + doorW &&
  mouseY > doorY &&
  mouseY < doorY + doorH
) {
  if (door && !door.isPlaying()) {
    door.play();
    door.setVolume(0.5);
  }
  state = 3;
  startNewDay();
}
}else if(state == 4){
  let nextDX = 589;
    let nextDY = 443;
    let nextDW = 283;
    let nextDH = 114;

    let homeX = 46;
    let homeY = 449;
    let homeW = 129;
    let homeH = 114;

     if (
    mouseX > nextDX &&
    mouseX < nextDX + nextDW &&
    mouseY > nextDY &&
    mouseY < nextDY + nextDH
  ) {
    startNewDay();
}else if(
    mouseX > homeX &&
    mouseX < homeX + homeW &&
    mouseY > homeY &&
    mouseY < homeY + homeH
){
  state = 2;
}
}
}

// CLASS DEFS

// recipe class
class Recipe {

  constructor(){
    let randomChoose = random([0,1]); //cupcake or drink
    let randomIndex1 = random([0,1,2]); // base
    let randomIndex2 = random([0,1,2]); // frosting
    let randomIndex3 = random([0,1,2]); // topping
    let randomIndex4 = random([0,1,2,3]); // drink flavor

    //FIX HERE - choose drink!!!
    // randomChoose = 0;
    
    //Delete here - drink test
    // randomChoose = 0;
    if (randomChoose == 0){
      cupcakeWant = true;
      this.recipeItems = [masterObject[1][randomIndex1], masterObject[2][randomIndex2], masterObject[3][randomIndex3]];
    }else{
      this.recipeItems = [masterObject[4][randomIndex4]];
      cupcakeWant = false;
    }


    this.itemsNeeded = this.recipeItems;
    this.itemsNeeded = {}; //turn it into dictionary
    for(let item of this.recipeItems){
      this.itemsNeeded[item]=false; //initialize to false;
    }


  } //end of constructor for recipe


}




// customer class

class Customer {
  constructor(xPos, topY,recipe) {
    this.xPos = xPos;
    this.baseY = 500;  
    this.topY = topY;   
    this.yPos = this.baseY; 
    this.isPoppingUp = true;
    this.isPoppingDown =false;

    //Implemented
    this.recipe= recipe;
    this.recipeItemsReal = recipe.recipeItems;
    this.patience = random([1,2,3]);
    this.currentPatience = maxPatience;
    //this.customerImage = customerImage;
    this.ready = false;
    this.satisfactory = 5;

    this.served=[];
    this.finalPatienceRatio=0;

    this.imageIndex = random([0,1,2,3,4,5,6,7]);
    this.image = customerImages[this.imageIndex];

    this.orderBubbleImage = orderBubble;
    

    
  }

  display() {
    if(!this.ready)
    {this.currentPatience -= this.patience;}
    else{
      this.finalPatienceRatio = this.currentPatience / maxPatience;
    }

    
    //krispy draw customer
    image(this.image, this.xPos, this.yPos);
  

    // draw patience bar
    if(this.currentPatience <2900 && displayPatience){
      image(this.orderBubbleImage,40,0);
      // draw orders here (safely draw each requested item; skip missing images)

      if(this.recipeItemsReal[0]=="orange"){
        // console.log('customer wants orange juice');
        image(imgs.smalldrinkOrange,600,105);
      } else if(this.recipeItemsReal[0]=="coffee"){
        // console.log('customer wants coffee');
        image(imgs.smalldrinkCoffee,600,105);
      } else if(this.recipeItemsReal[0]=="matcha"){
        // console.log('customer wants matcha');
        image(imgs.smalldrinkMatcha,600,105);
      }else if(this.recipeItemsReal[0]=="strawberry"){
        // console.log('customer wants smoothie')
        image(imgs.smalldrinkSmoothie,600,105);
      }

 
      else{
          if(this.recipeItemsReal[0]=="baseMarble"){
                image(imgs.smallcupcakeMarble, 600,95);
              }  else if(this.recipeItemsReal[0]=="baseChoco"){
                image(imgs.smallcupcakeChoco, 600,95);
              }else{
                image(imgs.smallcupcakeVanilla, 600,95);
              }
          if(this.recipeItemsReal[1]=="frostingStrawberry"){
                image(imgs.smallfrostingStrawberry, 600,95);
              } else if(this.recipeItemsReal[1]=="frostingChocolate"){
                image(imgs.smallfrostingChocolate, 600,95);
              }else{
                image(imgs.smallfrostingLemon, 600,95);
              }

          if(this.recipeItemsReal[2]=="cherry"){
                image(imgs.smallcherry, 600,95);
              } else if(this.recipeItemsReal[2]=="oreoTopping"){
                image(imgs.smalloreo, 600,95);
              }else{
                image(imgs.smallsprinkles, 600,95);
              }
      }

    //asked chatGPT for calculation of patience level 
    if (this.currentPatience > maxPatience * 0.6) {
      image(patienceGreen, 0, 0);
    } else if (this.currentPatience > maxPatience * 0.3) {
      image(patienceYellow, 0, 0);
    } else {
      image(patienceRed, 0, 0);
    } }
  }

  //copilot helped with sorting this part out, i.e. popUp, popDown, poppingUp, poppingDown and update

  popUp() {
    this.isPoppingUp = true;
    this.isPoppingDown = false;
  }

  popDown(){
    this.isPoppingDown = true;
    this.isPoppingUp = false;
  }

  update() {
    if (this.isPoppingUp) {
      this.yPos = lerp(this.yPos, this.topY, 0.1);

      if (abs(this.yPos - this.topY) < 1) {
        this.yPos = this.topY;
        this.isPoppingUp = false;
      }
    }else if (this.isPoppingDown) {
      this.yPos = lerp(this.yPos, this.baseY, 0.05);

      if (abs(this.yPos - this.baseY) < 1) {
        this.yPos = this.baseY;
        this.isPoppingDown = false;
        this.resetForNewOrder();
    }
  }
}
  resetForNewOrder(){
    this.recipe = new Recipe();
    this.recipeItemsReal = this.recipe.recipeItems;
    this.currentPatience = maxPatience;
    this.patience = random([1,2,3]);
    if(day>3 && day <=5){
      this.patience = this.patience * 1.1; //patience dies faster
    }else if(day>5 && day<=7){
      this.patience = this.patience * 1.3;
    }else if(day>7 && day<=10) {                       //after day 7
      this.patience = this.patience * 1.6; //crazy fast after 
    }else if(day>10){
      this.patience = this.patience * 2.5;
      // console.log("this patience:",this.patience);
    }
    
    this.ready = false;
    this.satisfactory = 5;
    this.served = [];
    
    this.popUp();
    displayPatience = true; 

    this.orderBubbleImage = orderBubble;

    this.imageIndex = random([0,1,2,3,4,5,6,7]);
    this.image = customerImages[this.imageIndex];
    baseStacked = false;
    frostingStacked = false;
    toppingStacked = false;
  }
}

// item superclass

class Item {
    constructor(x, y, radius, name, imgSrc) {
        this.x = x
        this.y = y
        this.radius = radius
        this.name = name
        this.imgSrc = imgSrc;
        this.items = []
        this.itemObjs = []
    }

    contains(x, y) {
        if (dist(x,y,this.x,this.y) <= this.radius) {
            return true
        }
        return false
    }

    displayAndDraw() {
        if (this.imgSrc != null) {
            image(this.imgSrc, this.x, this.y);
        }
    }

    itemsIncluded() {
        return this.items
    }
}

// draggable subclass

class Draggable extends Item {
    constructor(x, y, radius, name, imgSrc, altImg, docks) {
        super(x, y, radius, name, imgSrc);
        this.docks = docks
        this.dragging = false;
        this.altImg = altImg;
    }

    drag() {
        if (dragMode) {
            this.x = mouseX;
            this.y = mouseY;
            if (this.itemObjs.length > 0) {
                for(let item of this.itemObjs) {
                    item.x = mouseX;
                    item.y = mouseY;
                }
            }
            //if dragging from blender, remove img screen
            //console.log(this)
            if (dist(mouseX, mouseY, blender.x, blender.y) < 40) {
              blenderImg = null;
              if(blenderSound.isPlaying()){
                blenderSound.stop();
              }
            }

            //remove this item from dock
            for (let dock of this.docks) {
                if (dock.items.includes(this.name)) {
                    dock.items.splice(dock.items.indexOf(this.name), 1);
                    dock.itemObjs.splice(dock.itemObjs.indexOf(this), 1);
                }
            }
        }
    }

    displayAndDraw() {
        super.displayAndDraw()
    }

    dock() {
        // console.log("hi")
        let minDist = Number.MAX_VALUE;
        let minDock = null;
        for (let i of this.docks) {
          // console.log(i)
          if (dist(i.x, i.y, this.x, this.y) < minDist) {
              minDock = i;
              minDist = dist(i.x, i.y, this.x, this.y);
          }
        }

        // remove submitted order from arrays 
        // as well as any aux items
        if (minDock.name == "orderZone") {
          // gather the names being submitted: this item + any auxiliary item names
          let submittedNames = [this.name];
          for (let auxName of this.items) {
            if (!submittedNames.includes(auxName)) submittedNames.push(auxName);
          }

          // assign submitted names to the current customer BEFORE removing from displayable
          if (typeof tempCustomer !== 'undefined' && tempCustomer != null) {
            tempCustomer.served = submittedNames.slice();
            tempCustomer.ready = true;
          }

          // signal to the main loop to calculate score
          finalServed = tempServed //krispy
          
          orderServed = true; // order is not served if it is in trashZone

          // remove the submitted draggable(s) from global arrays
          displayable.splice(displayable.indexOf(this),1);
          draggable.splice(draggable.indexOf(this),1);
          for (let item of this.items) {
              displayable.splice(displayable.indexOf(item),1);
              draggable.splice(draggable.indexOf(item),1);
          }
        }

        if (minDock.name == "blender") {
             if (!blenderSound.isPlaying()) {
                 blenderSound.loop();
             }}
            
        // console.log(minDock.name)
        if (minDock.name == "trashZone") {

          //krispy HERE HERE HERE
          baseStacked = false;
          frostingStacked = false;
          toppingStacked = false;


          displayable.splice(displayable.indexOf(this),1);
          draggable.splice(draggable.indexOf(this),1);
          for (let item of this.items) {
              displayable.splice(displayable.indexOf(item),1);
              draggable.splice(draggable.indexOf(item),1);
          }
        }
        this.x = minDock.x;
        this.y = minDock.y;
        if (!minDock.items.includes(this.name)){
            //should push docking item and any auxillary items
            minDock.itemObjs.push(this)
            minDock.items.push(this.name)
            for (let itemName of this.items) {
                minDock.items.push(itemName);
            } 
        }
    }
}


// source class

class Source {
    // type 0 -> circle use width for radius
    // type 1 -> rect use width and height
    // pre info that items are created upon
    constructor(x, y, width, height, type, name, imgSrc, altImg, docks) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = width;
        this.height = height;
        this.name = name;
        this.imgSrc = imgSrc;
        this.altImg = altImg;
        this.docks = docks
    }
    // for testing purposes
    display() {
        if (this.type == 0) {
            ellipse(this.x, this.y, this.width)
        }
        else {
            rect(this.x, this.y, this.width, this.height);
        }
    }
    contains() {
        if (this.type == 0) {
            if (dist(mouseX,mouseY,this.x,this.y) <= this.width) {
                return true
            }
            return false
        }
        else {
            if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.height) {
                return true
            }
            return false
        }
    }
}


function calculateScore(customer){


  // first check what we did right
  let score = 0;
  let toppingOnly = false;
  
  console.log("@@@@this is what customer wanted:", customer.recipe ? customer.recipe.recipeItems : null);
  console.log("@@@@this is what it got:", customer.served);
  console.log("!!!!final served",finalServed);
  if(customer.served.length==1){
    //gave only the topping
    toppingOnly = true;


  }

  // add points for patience remaining
  if (customer.finalPatienceRatio > 0.6) {
    score += 1; console.log("patience bonus +1");
    }
  else if (customer.finalPatienceRatio < 0.3) {
    score -= 1; console.log("patience bonus -1");
  }

if(finalServed.length<customer.served.length){ //prevent bug
  finalServed = customer.served;
  console.log("#####PREVENT BUG######");
}
  if (cupcakeWant) //cupcake calculator
{
  console.log("YESSSSS CUPCAKE");
  if (customer.recipe && Array.isArray(customer.recipe.recipeItems)) {
    for (let item of customer.recipe.recipeItems) {
      if (finalServed && finalServed.includes(item) && !toppingOnly) {
        score += 1;
        perfectScore+=1;
      }
    }
  }

  // penalize incorrect extra items (each extra wrong item reduces score by 1, EVEN below 0)
  if (customer.served && customer.recipe && Array.isArray(customer.served)) {
    for (let s of finalServed) {
      if (!customer.recipe.recipeItems.includes(s) ) {
        score -= 1; console.log("wrong item penalty -1 for", s);
        perfectScore-=1;
        
      }
    }
  }
}
if(!cupcakeWant){

  // console.log('NOOOO DRINk');
  console.log("WANTED",customer.recipe.recipeItems);
  console.log("SERVED",customer.served);
  // console.log("FINAL SERVED",finalServed);
  if(customer.recipe.recipeItems[0]=='strawberry'){
    
    if(finalServed[1]=="Smoothie"||finalServed[0]=="Smoothie"){ //just in case 
      score+=3;
      perfectScore=3;
    }
    // I have Smoothie
  }else if(customer.recipe.recipeItems[0]=='matcha'){
   
    if(finalServed[1]=="Matcha" || finalServed[0]=="Matcha"){ // this should be Matcha
      score+=3;
      perfectScore=3;
      console.log('perfectly served');
    }
    // I have Matcha YEAH IT IS all hardcoded here
  }else if(customer.recipe.recipeItems[0]=='orange'){
  
    if(finalServed[1]=="Orange"||finalServed[1]=="Orange"){ //krispy!!!!
      score+=3;
      perfectScore=3;
      console.log('perfectly served');
    }
  // I have Orange
  }else if(customer.recipe.recipeItems[0]=='coffee'){
   
    if(finalServed[1]=="Coffee"){
      score+=3;
      perfectScore=3;
      console.log('perfectly served');
    }
    // I have coffee
  }

}

// console.log("FINAL SERVED",finalServed);

  coins += score;
  coins = max(0,coins);

  localStorage.setItem('coins', coins);

  customersServedToday += 1;
  moneyEarnedToday += score;
  console.log("you earned:",score);
  toppingOnly = false;

  
  return score;
}
