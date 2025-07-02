<template>
  <!-- Hero Section -->
  <section>
    <div class="mx-auto">
      <img
        src="../assets/MainPage_Img.png"
        alt="APEX 배경 이미지"
        class="w-full h-auto block object-cover max-h-[300px] sm:max-h-[500px]"
      />
    </div>
  </section>

  <!-- Notification Section -->
  <section class="bg-[#0f131c] min-h-screen flex flex-col items-center py-12 px-4 sm:py-20">
    <h1 class="text-white text-xl sm:text-2xl font-bold mb-6 sm:mb-10 text-center">
      Notification
    </h1>

    <div class="max-w-3xl w-full">
      <ol class="text-white text-base sm:text-lg space-y-4 list-decimal list-inside sm:pl-6 px-2">
        <li>
          We are no longer looking for new members.
        </li>
        <li>
          To apply, please fill out the form:
          <a
            href="#"
            target="_blank"
            rel="noopener"
            class="text-blue-500 hover:underline break-all"
          >
            APEX Club Application Form
          </a>
        </li>
      </ol>
    </div>
  </section>
</template>