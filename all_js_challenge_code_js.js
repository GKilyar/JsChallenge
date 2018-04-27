    // Array.prototype.filter()
    // 1. Filter the list of inventors for those who were born in the 1500's
    const fifteen = inventors.filter( item =>(item.year > 1500 && item.year < 1600))
    console.table(fifteen)
    // Array.prototype.map()
    // 2. Give us an array of the inventors' first and last names
    const fullName = inventors.map(item =>`${item.first} - ${item.last}`);
    console.log(fullName);
    // Array.prototype.sort()
    // 3. Sort the inventors by birthdate, oldest to youngest
    const orderd = inventors.sort((a,b) =>a.year > b.year ? 1:-1);
    console.table(orderd);
    // Array.prototype.reduce()
    // 4. How many years did all the inventors live?
    const totalYears = inventors.reduce((total,item)=>{
        return total + (item.passed - item.year);
    },0); 
    // 5. Sort the inventors by years lived
    const oldest = inventors.sort(function(a,b){
        const lastInventor = a.passed - a.year;
        const nextInvenyer = b.passed - b.year;
        return lastInventor > nextInvenyer ? -1:1;
    });
    console.table(oldest);
    // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
    // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
    // const category = document.querySelector('.mw-category');
    // const links = Array.from(category.querySelectorAll('a'));
    // const de = links
    //             .map(link => link.textContent)
    //             .filter(streetName => streetName.includes('de'));

    // 7. sort Exercise
    // Sort the people alphabetically by last name
    const alpha = people.sort((last,next)=>{
        const [aLast,aFirst] = last.split(', ');
        const [bLast,bnext] = next.split(', ');
        return aLast > bLast ? -1:1;
    });

    console.log(alpha);
    // 8. Reduce Exercise
    // Sum up the instances of each of these    
    const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];

    const transportation = data.reduce((obj,item) =>{
        if(!obj[item]){
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    },{});

    console.log(transportation);

    //去除重复元素
    const quchong = data.sort().reduce(
        (init,current)=>{
            if(init.length ===0 || init[init.length-1]!==current){
                init.push(current)
            }
            return init
        },[]
    )
    console.log(quchong)

        // ## Array Cardio Day 2

    const people = [
      { name: 'Wes', year: 1988 },
      { name: 'Kait', year: 1986 },
      { name: 'Irv', year: 1970 },
      { name: 'Lux', year: 2015 }
    ];

    const comments = [
      { text: 'Love this!', id: 523423 },
      { text: 'Super good', id: 823423 },
      { text: 'You are the best', id: 2039842 },
      { text: 'Ramen is my fav food ever', id: 123523 },
      { text: 'Nice Nice Nice!', id: 542328 }
    ];

    // Some and Every Checks
    // Array.prototype.some() // is at least one person 19 or older?
    const someOlder = people.some(person => ((new Date()).getFullYear()) - person.year >=19 );
    console.log({someOlder});
    // Array.prototype.every() // is everyone 19 or older?
    const allOlder = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
    console.log({allOlder})
    // Array.prototype.find()
    // Find is like filter, but instead returns just the one you are looking for
    // find the comment with the ID of 823423
    const diff_id = comments.find(item => item.id ===823423)
    console.log(diff_id);

    // Array.prototype.findIndex()
    // Find the comment with this ID
    const index = comments.findIndex(item => item.id === 823423)
    console.log(index);
    // delete the comment with the ID of 823423
    const newcomments = [
      ...comments.slice(index)
    ]
    console.table(newcomments)


    // ## Array Cardio Day 2
      // Array.prototype.some() // is at least one person 19 or older?
      const someOlder = people.some(person => ((new Date()).getFullYear()) - person.year >=19 );
      console.log({someOlder});
      // Array.prototype.every() // is everyone 19 or older?
      const allOlder = people.every(person => ((new Date()).getFullYear()) - person.year >= 19);
      console.log({allOlder})
      // Array.prototype.find()
      // find the comment with the ID of 823423
      const diff_id = comments.find(item => item.id ===823423)
      console.log(diff_id);
  
      // Array.prototype.findIndex()
      // Find the comment with this ID
      const index = comments.findIndex(item => item.id === 823423)
      console.log(index);
      // delete the comment with the ID of 823423
      const newcomments = [
        ...comments.slice(index)
      ]
      console.table(newcomments)
      /**
       * ---------------------------------------------------------------------------------------------------
       */

/**
 * 
 * canvas drawing
 * 
 */
    const canvas = document.querySelector('#draw')
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 100;

    let isDrawing = false
    let lastX = 0;
    let lastY = 0;
    let huabi = 0;
    let direction = true;


    function Drawing(e){
        if(!isDrawing) return


        ctx.strokeStyle = `hsl(${huabi},100%,50%)`
        ctx.beginPath()
        ctx.moveTo(lastX,lastY)
        ctx.lineTo(e.offsetX,e.offsetY)

        ctx.stroke()

        [lastX,lastY] = [e.offsetX,e.offsetY]
        huabi++

        if(huabi<=360){
            huabi = 0
        }

        if(ctx.lineWidth>=60 || ctx.lineWidth<=10){
            direction = !direction
        }

        if(direction){
            ctx.lineWidth++
        }else{
            ctx.lineWidth--
        }

    }
    //mouse move event
    canvas.addEventListener('mousedown',(e)=>{
        isDrawing = true;
        [lastX,lastY] = [e.offsetX,e.offsetY]
    })

    canvas.addEventListener('mousemove',draw)
    canvas.addEventListener('mouseup', () => isDrawing = false)
    canvas.addEventListener('mouseout',()=> isDrawing = true)


/**
 * 
 * console.方法
 * 
 */
    console.count('a')
    console.count('a')
    console.count('a')
    console.count('b')
    console.count('d')
    console.count('r')
    console.count('r')
    console.count('d')
    console.count('f')
    console.count('f')
    console.count('f')

    console.warn('warning!!!!')
    console.info('fuck code')
    console.error('error shit')
    console.time('fetching data')
    console.table()


/**
 * 
 * Clock
 * 
 */
    const secondHand = document.querySelector('.second')
    const minsHand = document.querySelector('.min')
    const hourHand = document.querySelector('.hour')

    function setDate(){
        const now = new Date();

        const second = now.getSeconds()
        const secondDegree = ((second / 60)*360)+90
        secondHand.style.transform = `rotate(${secondDegree}deg)`

        const min = now.getMinutes()
        const minDegree = ((hour/12)*360 +(second/60)*30)+90
        minsHand.style.transform = `rotate(${minDegree}deg)`

        const hour = now.getHours()
        hoursDegree = ((hour/12)*360)+((min/60)*30)+90
        hourHand.style.transform = `rotate(${hoursDegree}deg)`
    }

    setInterval(setDate,1000)
    setDate()

/**
 * 
 *  filter for a city
 * 
 */
    const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

    const cities = []
    
    fetch(endpoint).then(item => item.json()).then(data => cities.push(...data))

    function findMatches(wordMatch,cities){
        return cities.filter(place =>{
            const regx = new RegExp(wordMatch,'gi')
            return place.city.match(regx) || place.state.match(regx)
        })
    }

    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    function displayMatches(x){
        const matchArray =findMatches(this.value,cities)

        const html = matchArray.map(item =>{
            const regx = new RegExp(this.value,'gi')
            const cityName = item.city.replace(regex, `<span class="hl">${this.value}</span>`)
            const stateName = item.state.replace(regex, `<span class="hl">${this.value}</span>`)

            return `<li>
                    <span class="name">${cityName},${stateName}</span>
                    <span class="population">${numberWithCommas(item.population)}</span>
                    </li>`
        }).join('')
        suggestions.innerHTML = html
    }
    const searchInput = document.querySelector('.search')
    const suggestions = document.querySelector('.suggestions')

    searchInput.addEventListener('change', displayMatches)
    searchInput.addEventListener('keyup', displayMatches)

/**
 * 
 *  fix nav
 * 
 */

    const nav = document.querySelector('#main')
    let topNav = nav.offsetTop

    function fixNav(){
        if(window.scrollY >= topNav){
            document.body.style.paddingTop = nav.offsetHeight + 'px'
            document.body.classList.add('fixed-nav')
        }else{
            document.body.classList.remove('fixed-nav');
            document.body.style.paddingTop = 0;
        }
    }
    window.addEventListener('scroll', fixNav);


/**
 * 
 *  Flex picture gallery
 * 
 */

const panels = document.querySelectorAll('.panel');
function toggleOpen(){
  this.classList.toggle('open');
}
function toggleActive(e){
  console.log(e.propertyName);
  if(e.propertyName.includes('flex')){
    this.classList.toggle('open-active');
  }
}
panels.forEach(item => item.addEventListener('click',toggleOpen));
panels.forEach(item => item.addEventListener('transitionend',toggleActive));


/**
 * 
 *  基本都是操作dom的
 * 
 */
