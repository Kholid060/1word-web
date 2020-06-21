<template>
  <div class="container p-10">
    <practice-complete
      v-if="isPracticeDone"
      :question="questions.length"
      :correct="correctCount"
    ></practice-complete>
    <template v-else>
      <Header :number="qNumber" :length="questions.length"></Header>
      <div class="mt-8 w-full lg:w-5/12 mx-auto">
        <question
          v-model="userAnswer"
          :data="currentQuestion"
          @answer="answerQuestion"
        ></question>
      </div>
      <transition name="slide">
        <message
          v-if="answered"
          :correct="userAnswer === currentQuestion.answer"
          @next="nextQuestion"
        ></message>
      </transition>
    </template>
  </div>
</template>
<script>
import shortid from 'shortid';
import Header from '~/components/Pages/Practice/Header.vue';
import Message from '~/components/Pages/Practice/Message.vue';
import Question from '~/components/Pages/Practice/Question.vue';
import PracticeComplete from '~/components/Pages/Practice/PracticeComplete.vue';
import questionGenerator from '~/utils/questionGenerator';
import firestore from '~/utils/firestore';

export default {
  components: { Header, Message, Question, PracticeComplete },
  middleware({ store, redirect, params }) {
    if (!store.state.practice.valid)
      return redirect(`/dashboard/language/${params.id}`);
  },
  async asyncData({ redirect, store, params }) {
    const { length } = store.state.practice;

    const words = store
      .$db()
      .model('words')
      .query()
      .where('languageId', params.id)
      .get();
    const questions = await questionGenerator(words, length);

    return {
      questions
    };
  },
  data: () => ({
    userAnswers: [],
    qNumber: 0,
    correctCount: 0,
    userAnswer: '',
    answered: false
  }),
  computed: {
    isPracticeDone() {
      return this.qNumber === this.questions.length;
    },
    currentQuestion() {
      return this.questions[this.qNumber];
    }
  },
  mounted() {
    document.addEventListener('keyup', this.nextQuestionKey);
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.nextQuestionKey);
  },
  methods: {
    nextQuestion() {
      this.userAnswer = '';
      this.answered = false;
      this.qNumber += 1;

      if (this.isPracticeDone) {
        const practice = {
          id: shortid.generate(),
          correct: this.correctCount,
          wrong: this.questions.length - this.correctCount,
          score: (this.correctCount / this.questions.length) * 100,
          question_length: this.questions.length,
          languageId: this.$route.params.id,
          timestamp: Date.now()
        };

        firestore
          .reference(`users/${this.$store.state.user.localId}/practices`)
          .set(practice)
          .then(() => {
            this.$store
              .$db()
              .model('practices')
              .insert({
                data: practice
              });
          });
      }
    },
    answerQuestion(userAnswer) {
      this.answered = true;
      this.userAnswer = userAnswer;

      if (userAnswer === this.currentQuestion.answer) this.correctCount += 1;

      userAnswer === this.currentQuestion.answer
        ? this.playAudio('correct')
        : this.playAudio('wrong');
    },
    playAudio(name) {
      /* eslint-disable-next-line */
      new Audio(require(`~/assets/audio/${name}.wav`));
    },
    nextQuestionKey({ key }) {
      if (key === 'Enter' && this.answered) {
        this.nextQuestion();
      }
    }
  },
  head() {
    return {
      title: 'Practice'
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.qNumber === this.questions.length) return next();

    const confirm = window.confirm('Do you really want to leave?');
    if (confirm) {
      this.$store.commit('updateState', {
        key: 'practice',
        data: {
          length: 0,
          valid: false
        }
      });

      next();
    }
  }
};
</script>
<style scoped>
.slide-enter-active {
  transition: all 0.4s ease;
}
.slide-leave-active {
  opacity: 0;
  transition: all 0.4s ease;
}
.slide-enter, .slide-leave-to
/* .slide-leave-active below version 2.1.8 */ {
  transform: translateY(12px);
}
</style>
