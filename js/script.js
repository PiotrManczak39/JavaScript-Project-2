/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing




const students = document.querySelectorAll('li');
const pageBig = document.querySelector('.page');
const searchBox = document.querySelector('.page-header');
const noResults = document.querySelector('.no-results');
const searchButton = document.getElementsByTagName('button')[0];
const searchBoxInput = document.getElementsByTagName('input')[0];
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
            showPage Function
------------------------------------------------------------*/

const showPage = (list, page) => {
  let lower = (page * 10) - 10;
  let upper = lower + 9;
  for (let i = lower; i<=upper; i++) {
    list[i].style.display = 'block';
  }
}

/*-----------------------------------------------------------
          Appending searchBar, Hiding 'No results'
          Hiding students except for first 10
------------------------------------------------------------*/

searchBar(searchBox);
noResults.style.display = 'none';
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

/*----------------------------------------------------------------------------------------
                                 Search engine
-------------------------------------------------------------------------------------*/

document.querySelector('.student-search').addEventListener('keyup', (e) => {
  let term = e.target.value.toLowerCase();
  let newArray = [];
  for (let i=0; i<studentsNames.length; i++) {
    let name = studentsNames[i].textContent.toLowerCase();
    if (name.indexOf(term) !== -1) {
       let studentInfo = studentsNames[i].parentNode.parentNode;
      newArray.push(studentInfo);
    }
  }
  showPage(newArray);
});

appendPageLinks(students);

// Remember to delete the comments that came with this file, and replace them with your own code comments.
