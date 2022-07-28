const { createApp } = Vue;
const vueApp;

function getAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

vueApp = createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
    };
  },
  methods: {
    attackMonster() {
      const damage = getAttackValue(12, 5);
      this.monsterHealth = this.monsterHealth - damage;
      this.attackPlayer()
    },
    attackPlayer() {
      const damage = getAttackValue(15, 8);
      this.playerHealth = this.playerHealth - damage;
    },
  },
});

vueApp.mount('#game');
