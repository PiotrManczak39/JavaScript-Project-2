/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//Global variables

const students = document.querySelectorAll('li');
const pageBig = document.querySelector('.page');
const searchBox = document.querySelector('.page-header');
const studentsNames = document.getElementsByTagName('h3');




/*-----------------------------------------------------------
             Function creating searchBar
------------------------------------------------------------*/

const searchBar = (htmlElement) => {
  let div = document.createElement('div');
  let input = document.createElement('input');
  let button = document.createElement('button');
  input.placeholder = "Search for students...";
  button.textContent = 'Search';
  div.className = 'student-search';
  div.appendChild(input);
  div.appendChild(button);
  htmlElement.appendChild(div);
}

/*-----------------------------------------------------------
            creating "No Results" using JavaScript
------------------------------------------------------------*/

let div = document.createElement('div');
div.className = 'no-results';
let h2 = document.createElement('h2');
h2.textContent = 'No Results';
div.appendChild(h2);
pageBig.appendChild(div);
const noResults = document.querySelector('.no-results');
noResults.style.display = 'none';

/*-----------------------------------------------------------
            showPage Function
------------------------------------------------------------*/

const showPage = (list, page) => {
  let lower = (page * 10) - 10;
  let upper = lower + 9;
  for (let i = lower; i<=upper; i++) {
    if (list[i]) {
      list[i].style.display = 'block';
    } else {
      console.log('No li. I am sorry');
    }
  }
}

/*-----------------------------------------------------------
          Appending searchBar, Hiding 'No results'
          Hiding students except for first 10
------------------------------------------------------------*/

searchBar(searchBox);
students.forEach( student => student.style.display = 'none');
showPage(students, 1);

/*-----------------------------------------------------------
          appendPageLinks Function
------------------------------------------------------------*/

const appendPageLinks = (list) => {
  let pagesTotal = Math.floor(list.length / 10) + 1;
  let page = document.createElement('div');
  page.className = 'pagination';
  pageBig.appendChild(page);
  let ul = document.createElement('ul');
  page.appendChild(ul);
  for (let i=0; i<pagesTotal; i++) {
    let li = document.createElement('li');
    let anchor = document.createElement('a');
    let liNumber = i+1;
    anchor.textContent = liNumber;
    anchor.href = '#';
    li.appendChild(anchor);
    ul.appendChild(li);
  }
  const anchors = document.getElementsByTagName('a');
  anchors[0].className = 'active';

  for ( let i=0; i<anchors.length; i++) {
    anchors[i].addEventListener('click', (e) => {
      for (let i=0; i<anchors.length; i++) {
        anchors[i].className = '';
      }
      event.target.className = 'active';
      students.forEach( student => student.style.display = 'none');
      showPage(list, anchors[i].textContent);
    });
  }
}

appendPageLinks(students);

/*----------------------------------------------------------------------------------------
                                 Search engine
-------------------------------------------------------------------------------------*/
const pagination = document.querySelector('.pagination');
const searchButton = document.getElementsByTagName('button')[0];
const searchBoxInput = document.getElementsByTagName('input')[0];

//Event listener attached to the search box
document.querySelector('.student-search').addEventListener('keyup', (e) => {
  let term = e.target.value.toLowerCase();
  let newArray = [];
  for (let i=0; i<studentsNames.length; i++) {
    let name = studentsNames[i].textContent.toLowerCase();
    //words comparison
    if (name.indexOf(term) !== -1) {
      let studentInfo = studentsNames[i].parentNode.parentNode;
      newArray.push(studentInfo);
    } else {
      let studentInfo = studentsNames[i].parentNode.parentNode;
      studentInfo.style.display = 'none';
    }
  }
  //displaying "No results"
  if (newArray == '') {
    noResults.style.display = 'block';
    document.querySelector('.student-list').style.display = 'none';
    pagination.style.display = 'none';
  } else {
  //hiding "No results"
    noResults.style.display = 'none';
    document.querySelector('.student-list').style.display = 'block';
    showPage(newArray, 1);
  }
  //Clearing pagination and applying new one
  pagination.style.display = 'none';
  //And another try using .removeChild() - it shows fault in the console
  document.querySelector('.page').removeChild(pagination);
  appendPageLinks(newArray);
});
