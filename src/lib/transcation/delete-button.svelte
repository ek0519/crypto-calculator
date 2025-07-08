<script lang="ts">
  import { Button } from "$components/ui/button";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { enhance } from "$app/forms";
  let open = $state(false);
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Trigger>
    <Button type="submit" variant="destructive">delete</Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>確認刪除</AlertDialog.Title>
      <AlertDialog.Description>
        確認要刪除這筆交易嗎？這個操作無法撤銷。
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>不要</AlertDialog.Cancel>
      <AlertDialog.Action>
        <form method="POST" use:enhance action="?/delete">
          <Button type="submit">確認</Button>
        </form>
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
