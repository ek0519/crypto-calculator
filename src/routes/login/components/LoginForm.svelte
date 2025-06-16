<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "$lib/components/ui/card"
  import { AlertCircle, Mail, CheckCircle } from "@lucide/svelte"

  interface Props {
    onLogin: (email: string) => void
  }

  let { onLogin }: Props = $props()

  let email = $state<string>('')
  let isLoading = $state<boolean>(false)
  let showSuccess = $state<boolean>(false)
  let error = $state<string>('')

  // 模擬發送登入連結
  async function sendMagicLink(): Promise<void> {
    if (!email || !isValidEmail(email)) {
      error = '請輸入有效的 email 地址'
      return
    }

    isLoading = true
    error = ''

    try {
      // 模擬 API 調用
      await new Promise<void>(resolve => setTimeout(resolve, 2000))

      // 在實際應用中，這裡會調用後端 API 發送登入連結
      console.log(`發送登入連結到: ${email}`)

      showSuccess = true

      // 模擬用戶點擊登入連結後的行為
      setTimeout(() => {
        onLogin(email)
      }, 3000)

    } catch (err: unknown) {
      error = '發送登入連結失敗，請稍後再試'
    } finally {
      isLoading = false
    }
  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function handleSubmit(event: SubmitEvent): void {
    event.preventDefault()
    sendMagicLink()
  }

  function resetForm(): void {
    showSuccess = false
    email = ''
    error = ''
  }
</script>

<Card class="w-full max-w-md">
  <CardHeader class="text-center">
    <CardTitle class="text-2xl font-bold">無密碼登入</CardTitle>
    <CardDescription>
      輸入您的 email 地址，我們將發送登入連結給您
    </CardDescription>
  </CardHeader>

  <CardContent>
    {#if showSuccess}
      <div class="text-center space-y-4">
        <div class="flex justify-center">
          <CheckCircle class="h-16 w-16 text-green-500" />
        </div>
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-gray-900">檢查您的 Email</h3>
          <p class="text-sm text-gray-600">
            我們已發送登入連結到 <strong>{email}</strong>
          </p>
          <p class="text-xs text-gray-500">
            點擊 email 中的連結即可完成登入
          </p>
        </div>
        <Button variant="outline" onclick={resetForm} class="w-full">
          使用其他 Email
        </Button>
      </div>
    {:else}
      <form onsubmit={handleSubmit} class="space-y-4">
        <div class="space-y-2">
          <Label for="email">Email 地址</Label>
          <div class="relative">
            <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              type="email"
              bind:value={email}
              placeholder="請輸入您的 email"
              class="pl-10"
              disabled={isLoading}
              required
            />
          </div>
        </div>

        {#if error}
          <div class="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle class="h-4 w-4" />
            <span>{error}</span>
          </div>
        {/if}

        <Button
          type="submit"
          class="w-full"
          disabled={isLoading || !email}
        >
          {#if isLoading}
            <div class="flex items-center space-x-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>發送中...</span>
            </div>
          {:else}
            發送登入連結
          {/if}
        </Button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-xs text-gray-500">
          點擊「發送登入連結」即表示您同意我們的
          <a href="#" class="text-blue-600 hover:underline">服務條款</a>
          和
          <a href="#" class="text-blue-600 hover:underline">隱私政策</a>
        </p>
      </div>
    {/if}
  </CardContent>
</Card>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  }
</style>
