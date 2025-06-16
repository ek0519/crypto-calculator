<script lang="ts">
    import LoginForm from "./components/LoginForm.svelte";


  let isLoggedIn = $state<boolean>(false)
  let userEmail = $state<string>('')

  function handleLogin(email: string): void {
    isLoggedIn = true
    userEmail = email
  }

  function handleLogout(): void {
    isLoggedIn = false
    userEmail = ''
  }
</script>

<main class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  {#if isLoggedIn}
    <div class="bg-white rounded-lg shadow-md p-8 w-full max-w-md text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">歡迎回來！</h2>
      <p class="text-gray-600 mb-6">您已成功登入：{userEmail}</p>
      <button
        onclick={handleLogout}
        class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        登出
      </button>
    </div>
  {:else}
    <LoginForm onLogin={handleLogin} />
  {/if}
</main>
