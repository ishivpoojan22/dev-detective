const url = "https://api.github.com/users/";
const get = (element) => document.getElementById(`${element}`);


const input = get("input");
const btn = get("btn");


btn.addEventListener('click', () => {
    if (input.value !== "") {
        getUserData(url + input.value);
    }
})

input.addEventListener('keydown', (e) => {
    // console.log(e.key);
    if (e.key === 'Enter') {
        if (input.value !== "") {
            getUserData(url + input.value);
        }
    }
}, false);

async function getUserData(gitUrl) {
    const response = await fetch(gitUrl);
    const data = await response.json();
    if (!data) {
        throw data;
    }
    updateProfile(data);
    // return data;
}

let dateSegment;
const noResults = get("noResults");

function updateProfile(data) {
    noResults.style.scale = 0;
    if (data.message !== "Not Found") {
        function checkNull(apiItem, domItem) {
            if (apiItem === "" || apiItem === null) {
                domItem.style.opacity = 0.5;
                domItem.previousElementSibling.style.opacity = 0.5;
                return false;
            }
            else {
                return true;
            }
        }
        const userImage = get("userImage");
        const name = get("name");
        const username = get("username");
        const date = get("date");
        const repos = get("repos");
        const followers = get("followers");
        const following = get("following");
        const profileBio = get("profileBio");
        const location = get("location");
        const website = get("website");
        const twitter = get("twitter");
        const company = get("company");
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


        // console.log(name);
        userImage.src = `${data.avatar_url}`;
        name.innerText = data?.name;
        username.innerText = `@${data?.login}`;
        username.href = data?.html_url;
        dateSegment = data?.created_at.split("T").shift().split("-");
        date.innerText = `Joined ${dateSegment[2]} ${month[dateSegment[1] - 1]} ${dateSegment[0]}`;

        profileBio.innerText = (data?.bio === null) ? "This Profile has no Bio" : data?.bio;;

        repos.innerText = data?.public_repos;
        repos.href = data?.repos_url;
        followers.innerText = data?.followers;
        followers.href = data?.followers_url;
        following.innerText = data?.following;
        following.href = data?.following_url;

        location.innerText = checkNull(data?.location, location) ? data?.location : "Not Available";

        website.innerText = checkNull(data?.blog, website) ? data?.blog : "Not Available";

        website.href = checkNull(data?.blog, website) ? data?.blog : "#";

        twitter.innerText = checkNull(data?.twitter_username, twitter) ? data?.twitter_username : "Not Available";

        twitter.href = checkNull(data?.twitter_username, twitter) ? `https://twitter.com/${data?.twitter_username}` : "#";

        company.innerText = checkNull(data?.company, company) ? data?.company : "Not Available";
    }
    else {
        noResults.style.scale = 1;
        setTimeout(() => {
            noResults.style.scale = 0;
        }, 2500);
    }
}




getUserData(url + "ishivpoojan22");
