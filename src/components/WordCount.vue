<template>
  <div>
  
  <form @submit.prevent="handleSubmit">
        <label for="wordcount_content">Enter some words to count:</label>
        <textarea ref="wordcount_content" v-bind:class="{error: error}" name="wordcount_content" id="wordcount_content" cols="30" rows="10" minlength="1" placeholder="now is the time for all good..." v-model="wordcount_content"></textarea>
        <input type="submit" value="Count" />
        <span v-text="wordcount"></span>
        <span v-show="error">Input invalid</span>
  </form>
  </div>
</template>

<script>
function postData(url, data) {
  return fetch(url, {
    body: JSON.stringify(data), 
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
      "content-type": "application/json"
    },
    method: "POST", 
    redirect: "follow"
  }).then(
    function(response) {
      if(!response.ok){
          throw new Error();
      }
      return response.json()
    });
}

export default {
  name: "WordCount",
  data() {
    return {
      wordcount_content: "",
      wordcount:0,
      error:false
    };
  },
  methods: {
    handleSubmit() {
      const params = { wordcount_content: this.wordcount_content };

      postData("/wordCount", params)
        .then(resp => {
          this.wordcount = resp.wordcount
          this.error = false;
          })
        .catch(()=>{
          this.wordcount_content = '';
          this.wordcount = null;
          this.error = true;  
          this.$refs.wordcount_content.focus();
        })
        ;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

label, textarea{
  display: block;
}
label {
  font-size: 16px;
}
</style>
