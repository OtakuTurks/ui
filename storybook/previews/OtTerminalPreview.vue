<script setup>
import OtTerminal from '../../src/components/OtTerminal.vue'
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Interactive Bash Simulator</h3>
      <div class="preview__col">
        <OtTerminal
          title="zoro@otakuturks ~ dev"
          copy-text="git commit -m 'feat: add terminal component'"
          height="320px"
        >
          <p>
            <span class="prompt">zoro@otakuturks ~</span>
            <span class="command">git status</span>
          </p>
          <p class="comment"># On branch main</p>
          <p class="comment"># Your branch is up to date with 'origin/main'.</p>
          <p class="comment"># Untracked files:</p>
          <p class="comment">
            # (use "git add &lt;file&gt;..." to include in what will be committed)
          </p>
          <p class="error"># src/components/OtTerminal.vue</p>
          <br />
          <p>
            <span class="prompt">zoro@otakuturks ~</span>
            <span class="command">git add . && git commit -m 'feat: add terminal component'</span>
          </p>
          <p class="success">[main bd532f1] feat: add terminal component</p>
          <p class="success">1 file changed, 114 insertions(+)</p>
          <p class="success">create mode 100644 src/components/OtTerminal.vue</p>
        </OtTerminal>
      </div>
    </section>
  </div>
</template>
