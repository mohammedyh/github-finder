const userInfoWrapper = document.querySelector('.user__info-wrapper');
const errorWrapper = document.querySelector('.error__wrapper');
const btn = document.querySelector('#search-btn');
const input = document.querySelector('input');

const getUserData = async userName => {
	try {
		const response = await fetch(`/users/${userName}`);
		const data = await response.json();

		if (data?.error) throw Error(data.message);

		input.value = '';
		return { data };
	} catch (error) {
		return error;
	}
};

const showUserInfo = async e => {
	e.preventDefault();
	const userName = input.value.trim();

	try {
		if (!userName) {
			input.value = '';
			input.focus();
			throw Error('Username cannot be empty');
		}

		const res = await getUserData(userName);

		if (!res.data) throw Error(res);

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
               <h2 class="basis-2/3 lg:basis-auto text-2xl lg:text-3xl font-bold text-white">
                 ${res.data.name ?? res.data.login}
               </h2>
               <p class="basis-1/3 lg:basis-auto mt-2 md:mt-0 text-sm sm:text-base lg:text-lg text-gray-400">
                 Joined ${new Date(res.data.created_at).toDateString()}
               </p>
             </div>

             <p class="mt-2 md:mt-1 md:text-lg lg:text-xl text-blue-600 selection:bg-slate-900 text-center md:text-left">
               <a href="${res.data.html_url}" rel="noopener" target="_blank">
                 @${res.data.login}
               </a>
             </p>

             <p class="mt-6 md:text-lg lg:text-xl text-gray-400 text-center md:text-left">
               ${res.data.bio ?? 'No bio'}
             </p>

             <div class="max-w-full mx-auto flex justify-between p-6 lg:p-8 mt-6 bg-slate-900 rounded-xl">
               <div>
                 <p class="text-gray-400 text-sm sm:text-base lg:text-lg">Repos</p>
                 <p class="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                   ${new Intl.NumberFormat().format(res.data.public_repos)}
                 </p>
               </div>

               <div>
                 <p class="text-gray-400 text-sm sm:text-base lg:text-lg">Followers</p>
                 <p class="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                   ${new Intl.NumberFormat().format(res.data.followers)}
                 </p>
               </div>

               <div>
                 <p class="text-gray-400 text-sm sm:text-base lg:text-lg">Following</p>
                 <p class="text-white text-lg sm:text-xl lg:text-2xl font-bold">
                   ${new Intl.NumberFormat().format(res.data.following)}
                 </p>
               </div>
             </div>

             <div class="mt-6 flex flex-wrap gap-4">
               <div class="flex items-center basis-1/2">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                 </svg>

                 <p class="ml-2 text-gray-400 text-sm lg:text-lg">
                   ${res.data.location ?? 'No location'}
                 </p>
               </div>

               <div class="flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                 </svg>

                 <p class="ml-2 text-gray-400 text-sm lg:text-lg">
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
                 </p>
               </div>

               <div class="flex items-center basis-1/2">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                 </svg>

                 <p class="ml-2 text-gray-400 text-sm lg:text-lg">
                   ${res.data.email ?? 'No email'}
                 </p>
               </div>

               <div class="flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                 </svg>

                 <p class="ml-2 text-gray-400 text-sm lg:text-lg">
                   ${res.data.company ?? 'No company'}
                 </p>
               </div>
             </div>
           </div>
         </div>
       `;
	} catch (error) {
		userInfoWrapper.innerHTML = '';
		errorWrapper.innerHTML = `
      <div class="flex justify-center px-5 py-4 bg-red-950 border border-red-900 text-red-200 mt-6 rounded" role="alert">
        <span>${error.message.replace(/^[^:]*:\s*/, '')}</span>
      </div>
      `;
		setTimeout(() => errorWrapper.firstElementChild.remove(), 3000);
	}
	e.preventDefault();
};

btn.addEventListener('click', showUserInfo);
