<script setup>
const { status, data, signIn, signOut } = useAuth()
status.value // Session status: `unauthenticated`, `loading`, `authenticated`
data.value // Session data, e.g., expiration, user.email, ...

const email = ref(null);

await signIn(undefined, { callbackUrl: '/dashboard' }) // Sign in the user
await signOut() // Sign out the user
</script>

<!-- <template>
<form>
  <label>Email:</label><br>
  <input type="text" v-model="email"><br>
  <button @click="login">Send link</button>
</form> 
</template> -->