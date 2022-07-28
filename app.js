const { createApp } = Vue;
let vueApp;

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

vueApp = createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      attackRound: 0,
      winner: null,
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
      const damage = getRandomValue(12, 5);
      this.monsterHealth = this.monsterHealth - damage;

      this.attackPlayer();
      this.incrementAttackRound();
    },
    attackPlayer() {
      const damage = getRandomValue(15, 8);
      this.playerHealth = this.playerHealth - damage;
    },
    healPlayer() {
      const health = getRandomValue(15, 8);

      if (this.playerHealth + health > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + health;
      }

      this.attackPlayer();
      this.incrementAttackRound();
    },
    specialAttack() {
      const damage = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - damage;

      this.attackPlayer();
      this.incrementAttackRound();
    },
    incrementAttackRound() {
      this.attackRound = this.attackRound + 1;
    },
  },
  watch: {
    monsterHealth(health) {
      if (health <= 0 && this.playerHealth <= 0) {
        this.winner = 'Tie Game!';
      } else if (health <= 0) {
        this.winner = 'You Win!';
      }
    },
    playerHealth(health) {
      if (health <= 0 && this.monsterHealth <= 0) {
        this.winner = 'Tie Game!';
      } else if (health <= 0) {
        this.winner = 'Oh no! The Monster Won.';
      }
    },
  },
});

vueApp.mount('#game');
