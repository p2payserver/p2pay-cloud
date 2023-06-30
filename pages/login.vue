<script setup>
const { signIn } = useAuth()
await signIn(undefined, { callbackUrl: `/dashboard` })
</script>
