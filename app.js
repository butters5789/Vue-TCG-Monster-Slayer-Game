const { createApp } = Vue;
let vueApp;

function getAttackValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

vueApp = createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      attackRound: 0,
    };
  },
  computed: {
    disableSpecialAttack() {
      return this.attackRound % 3 !== 0;
    },
    monsterHealthBarStyles() {
      return { width: `${this.monsterHealth}%` };
    },
    playerHealthBarStyles() {
      return { width: `${this.playerHealth}%` };
    },
  },
  methods: {
    attackMonster() {
      const damage = getAttackValue(12, 5);
      this.monsterHealth = this.monsterHealth - damage;
      this.attackPlayer();
      this.attackRound = this.attackRound + 1;
    },
    attackPlayer() {
      const damage = getAttackValue(15, 8);
      this.playerHealth = this.playerHealth - damage;
    },
    specialAttack() {
      const damage = getAttackValue(10, 25);
      this.monsterHealth = this.monsterHealth - damage;
      this.attackPlayer();
      this.attackRound = this.attackRound + 1;
    },
  },
});

vueApp.mount('#game');
