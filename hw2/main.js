let photos = ["./images/headshot-self.png", "./images/headshot-member1.png", "./images/headshot-member2.png", "./images/headshot-member3.png", "./images/headshot-member4.png", "./images/headshot-member5.png"];
const names = ['鐘揚', '彥儒', '孟宏', 'yl', '慕德', '子瑜'];
const fullNames = ['你', '李彥儒', '陳孟宏', 'yl h', '劉慕德 /Joshua Lau', '童子瑜'];
let id = [0, 1, 2, 3, 4, 5];

let = nowPeople = 1;

let someoneIsPinnedNow = true;


window.onload =  () => {
    // time now set
    checkTime();

    // Init member and function
    const members = document.getElementsByClassName("meet_member");
    for (let i = 1; i < 6; i++) {
        members[0].appendChild(createMember(names[i], fullNames[i], photos[i], i));
    }

    // Delete pin that is not myself
    let hostNow = document.getElementsByClassName("delete-host")[0];
    hostNow.addEventListener("click", deletePin);
    
    const host = document.getElementsByClassName("host")[0];
    hostToolBox = host.children[1].children[2];
    hostToolBox.addEventListener('click', pinChange);

    const addMember = document.getElementsByClassName("button-setting-add")[0].parentNode;
    addMember.addEventListener('click', addPeople);
}

const createMember = (name, fullName, photo, idMember) => {
    const member = document.createElement("div");
    member.classList.add("member");
    member.innerHTML = '<div class="delete-member"><img src="./images/x.png" width="20" height="20"></div>'
                    + '<div class="mute-member"><img src="./images/mute.png" width="20" height="20"></div>'
                    + '<div><div class="headshot"><img src="' + photo +'" alt="headshot" width="80" height="80"><p class="name-member">' + name + '</p><div class="tool-box" id="' + idMember.toString() + '"><div class="unpin"><img src="./images/pin.png" alt="toolbox" width="15" height="15"><div class="unpin-words"><p class="unpin-words-detail">Pin</p></div></div><div class="unblock"><img src="./images/mute.png" alt="toolbox" width="15" height="15"><div class="unblock-words"><p class="unblock-words-detail">Mute</p></div></div><div class="minimize"><img src="./images/remove.png" alt="toolbox" width="15" height="15"><div class="minimize-words"><p class="minimize-words-detail">Remove</p></div></div></div></div></div>'
                    + '<div><p class="member-wholename">' + fullName + '</p></div>';

    if (fullName === "你") {
        member.children[0].style.display = "none";
    }
    // console.log(idMember);
    
    member.children[0].addEventListener("click", (e) => {
        const self = e.target.parentNode.parentNode;
        self.parentNode.removeChild(self);

        let count = document.getElementsByClassName("group-people");
        count[0].innerHTML = Number(count[0].innerHTML) - 1;
    });
    const toolBox = member.children[2].children[0].children[2];
    toolBox.addEventListener('click', pinChange);
    if (idMember !== 0) nowPeople++;
    return member;
}

const deletePin = (e) => {
    let hostTool = e.target;
    hostTool = hostTool.parentNode.parentNode.children[1].children[2];
    let selfPos = 0
    for(let i = 0; i < id.length; i++){
        if(id[i] === 0){
            selfPos = i - 1;
            break;
        }
    }
    const members = document.getElementsByClassName("meet_member")[0];
    members.removeChild(members.children[selfPos]);

    id[0] = 0;

    hostTool = hostTool.parentNode;
    hostTool.children[0].src = photos[0];
    hostTool.children[1].innerHTML = names[0];
    hostTool.parentNode.children[2].children[1].innerHTML = fullNames[0];
    hostTool.parentNode.parentNode.children[0].children[3].style.display = "none";

    let count = document.getElementsByClassName("group-people");
    count[0].innerHTML = Number(count[0].innerHTML) - 1;
}

const pinChange = (e) => {
    // checktime
    checkTime();

    // deal with the changing
    let changeObj = e.target;
    while (changeObj.className !== "tool-box") {
        changeObj = changeObj.parentNode;
    }
    let pos = Number(changeObj.id);
    console.log(pos)

    if (someoneIsPinnedNow === true) {
        if (pos === 0) {
            let host = document.getElementsByClassName("host")[0];
            host.style.display = "none";

            const members = document.getElementsByClassName("meet_member");
            members[0].style.gridColumn = "1 / 3";

            members[0].append(createMember(names[id[0]], fullNames[id[0]], photos[id[0]], 0));
            
            someoneIsPinnedNow = false;
        }
        else {
            let who = id[pos];
            let hostId = id[0];
            id[pos] = id[0];
            id[0] = who;

            changeObj = changeObj.parentNode;
            changeObj.children[0].src = photos[hostId];
            changeObj.children[1].innerHTML = names[hostId];
            changeObj.parentNode.parentNode.children[3].children[0].innerHTML = fullNames[hostId];

            let host = document.getElementsByClassName("host")[0];
            host.children[1].children[0].src = photos[who];
            host.children[1].children[1].innerHTML = names[who];
            host.children[2].children[1].innerHTML = fullNames[who];

            changeObj.parentNode.parentNode.children[0].style.display = hostId == 0 ? "none" : "flex";
            host.children[3].style.display = who == 0 ? "none" : "flex";
        }
    }
    else {
        let who = id[pos];
        let hostId = id[0];
        id[pos] = id[0];
        id[0] = who;

        changeObj = changeObj.parentNode;
        changeObj.children[0].src = photos[hostId];
        changeObj.children[1].innerHTML = names[hostId];
        changeObj.parentNode.parentNode.children[3].children[0].innerHTML = fullNames[hostId];

        let host = document.getElementsByClassName("host")[0];
        host.children[1].children[0].src = photos[who];
        host.children[1].children[1].innerHTML = names[who];
        host.children[2].children[1].innerHTML = fullNames[who];

        changeObj.parentNode.parentNode.children[0].style.display = hostId == 0 ? "none" : "flex";
        host.children[3].style.display = who == 0 ? "none" : "flex";

        host.style.display = "flex";

        const self = changeObj.parentNode.parentNode;
        self.parentNode.removeChild(self);

        const members = document.getElementsByClassName("meet_member");
        members[0].style.gridColumn = "2 / 3";

        someoneIsPinnedNow = true;
    }
};


const addPeople = () => {
    let infoModal = document.querySelector("#infoModal");
    infoModal.showModal();

    let submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", getValueAndClose);
}

const getValueAndClose = (e) => {
    let submitTarget = e.target.parentNode.parentNode;

    const newName = submitTarget.children[0].children[1].value;

    const newFullName = submitTarget.children[1].children[1].value;

    const newPhoto = submitTarget.children[2].children[1].value;

    photos.push(newPhoto);
    names.push(newName);
    fullNames.push(newFullName);
    id.push(nowPeople);

    const members = document.getElementsByClassName("meet_member");
    members[0].appendChild(createMember(newName, newFullName, newPhoto, nowPeople));

    let count = document.getElementsByClassName("group-people");
    count[0].innerHTML = Number(count[0].innerHTML) + 1;

    let infoModal = document.querySelector("#infoModal");
    infoModal.close();

}

const checkTime = () => {
    var today = new Date();
    let allTime, pre;
    let minute = today.getMinutes();
    if (Number(minute) < 10) minute = "0" + minute.toString();

    if (0 <= Number(today.getHours()) && Number(today.getHours()) < 6) {
        pre = "凌晨";
        if (Number(today.getHours()) === 0) {
            allTime = pre + (Number(today.getHours()) + 12) + ":" + minute;
        }
        else {
            allTime = pre + today.getHours() + ":" + minute;
        }
    }
    else if (6 <= Number(today.getHours()) && Number(today.getHours()) < 12) {
        pre = "早上";
        allTime = pre + today.getHours() + ":" + minute;
    }
    else if (12 <= Number(today.getHours()) && Number(today.getHours()) < 18) {
        pre = "下午";
        allTime = pre + (today.getHours() - 12) + ":" + minute;
    }
    else if (18 <= Number(today.getHours()) && Number(today.getHours()) < 24) {
        pre = "晚上";
        allTime = pre + (Number(today.getHours()) - 12) + ":" + minute;
    }
    let timeNow = document.getElementsByClassName("time-detail");
    timeNow[0].innerHTML = allTime +  "&nbsp; | &nbsp; Web Programming";
};