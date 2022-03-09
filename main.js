const addValue = () => {
  const issueValue = document.getElementById('tracker-value')

  console.log(parseInt(issueValue.innerText));
  // const totalIssue = parseInt(issueValue.innerText) + 1
  // console.log(totalIssue);
  const issuValue = localStorage.getItem('issues')
  const parseIssue = JSON.parse(issuValue)
  issueValue.innerText = parseIssue.length
}

document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  console.log(id);
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue => issue.id !== id)
  remainingIssues.status = 'Delete';
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  //
  const issueValue = document.getElementById('tracker-value')
  issueValue.innerText = issues.length
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];

    issuesList.innerHTML += `
    <div class="well">
        <h6>Issue ID: ${id} </h6>
        <p><span class="label label-info"> ${status} </span></p>
        <h3 class="${status === 'Open' ? '' : 'strikeThrough'}"> ${description} </h3>
        <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
        <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
        <a href="#" onclick="closeIssue('${id}')" class="btn btn-warning">${status === 'Open' ? 'Close' : 'Close'}
        </a >
    <a href="#" onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</a>
    </div >
  `;
  }
}
