const userInfoWrapper = document.querySelector('.user__info-wrapper');
const errorWrapper = document.querySelector('.error__wrapper');
const btn = document.querySelector('#search-btn');
const input = document.querySelector('input');

const getUserData = async () => {
	const userInput = input.value.trim();
	const user = await fetch(`/user/${userInput}`);
	const data = await user.json();
	input.value = '';
	return { data };
};

const showUserInfo = e => {
	getUserData()
		.then(res => {
			if (!res.data.login) {
				throw Error('No user exists with the provided username');
			}

			userInfoWrapper.innerHTML = `
        <div class="w-5/6 lg:max-w-4xl p-6 md:p-10 mx-auto flex flex-col items-center md:flex-row md:items-start bg-slate-800 rounded-xl shadow-lg">
          <div class="flex">
            <img
              class="flex-shrink-0 rounded-full w-36 lg:w-48 border-4 object-cover"
              src="${res.data.avatar_url}"
              alt="Profile picture"
            />
          </div>

          <div class="user__info w-full mt-10 md:mt-4 md:ml-10">
            <div class="flex items-center md:items-start flex-col lg:flex-row lg:justify-between">
              <h1 class="basis-2/3 lg:basis-auto text-2xl lg:text-3xl font-bold text-white" id="name">${
								res.data.name ?? res.data.login
							}</h1>
              <h1 class="basis-1/3 lg:basis-auto mt-2 md:mt-0 text-sm sm:text-base lg:text-lg text-gray-400">
                Joined ${new Date(res.data.created_at).toDateString()}
              </h1>
            </div>

            <h1 class="mt-2 md:mt-1 md:text-lg lg:text-xl text-blue-600 selection:bg-slate-900 text-center md:text-left">
              <a href="${res.data.html_url}" rel="noopener" target="_blank">
                @${res.data.login}
              </a>
            </h1>

            <h1 class="mt-6 md:text-lg lg:text-xl text-gray-400 text-center md:text-left">
              ${res.data.bio ?? 'No bio'}
            </h1>

            <div class="max-w-full mx-auto flex justify-between p-6 lg:p-8 mt-6 bg-slate-900 rounded-xl">
              <div>
                <h2 class="text-gray-400 text-sm sm:text-base lg:text-lg">Repos</h2>
                <h2 class="text-white text-lg sm:text-xl lg:text-2xl font-bold">${
									res.data.public_repos
								}</h2>
              </div>

              <div>
                <h2 class="text-gray-400 text-sm sm:text-base lg:text-lg">Followers</h2>
                <h2 class="text-white text-lg sm:text-xl lg:text-2xl font-bold">${
									res.data.followers
								}</h2>
              </div>

              <div>
                <h2 class="text-gray-400 text-sm sm:text-base lg:text-lg">Following</h2>
                <h2 class="text-white text-lg sm:text-xl lg:text-2xl font-bold">${
									res.data.following
								}</h2>
              </div>
            </div>

            <div class="mt-6 flex flex-wrap gap-4">
              <div class="flex items-center basis-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>

                <h2 class="ml-2 text-gray-400 text-sm lg:text-lg">${
									res.data.location ?? 'No location'
								}</h2>
              </div>

              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                </svg>

                <h2 class="ml-2 text-gray-400 text-sm lg:text-lg">
                  <a
                    class="transition duration-150 hover:text-blue-600"
                    href="${
											res.data.blog.startsWith('http://') ||
											res.data.blog.startsWith('https://')
												? res.data.blog
												: '//' + res.data.blog
										}"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    ${
											res.data.blog
												? res.data.blog.replace(/(^\w+:|^)\/\//, '')
												: 'No blog'
										}
                  </a>
                </h2>
              </div>

              <div class="flex items-center basis-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>

                <h2 class="ml-2 text-gray-400 text-sm lg:text-lg">${
									res.data.email ?? 'No email'
								}</h2>
              </div>

              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>

                <h2 class="ml-2 text-gray-400 text-sm lg:text-lg">${
									res.data.company ?? 'No company'
								}</h2>
              </div>
            </div>
          </div>
        </div>
      `;
		})
		.catch(() => {
			userInfoWrapper.innerHTML = '';
			errorWrapper.innerHTML = `
          <div class="flex justify-center px-5 py-4 bg-red-100 border border-red-400 text-red-700 mt-6 rounded" role="alert">
            <strong class="font-bold mr-1">Holy smokes!</strong>
            <span>No account was found with the provided username, please try again</span>
          </div>
        `;
			setTimeout(() => errorWrapper.firstElementChild.remove(), 3000);
		});
	e.preventDefault();
};

btn.addEventListener('click', showUserInfo);
