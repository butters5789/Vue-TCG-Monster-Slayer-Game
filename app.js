const { createApp } = Vue;
let vueApp;

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

vueApp = createApp({
  data() {
    return {
      attackRound: 0,
      gamePlayLog: [],
      monsterHealth: 100,
      playerHealth: 100,
      winner: null,
    };
  },
  computed: {
    disableSpecialAttack() {
      return this.attackRound % 3 !== 0;
    },
    monsterHealthBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: '0%' };
      }

      return { width: `${this.monsterHealth}%` };
    },
    playerHealthBarStyles() {
      if (this.playerHealth < 0) {
        return { width: '0%' };
      }

      return { width: `${this.playerHealth}%` };
    },
  },
  methods: {
    attackMonster() {
      const damage = getRandomValue(12, 5);
      this.monsterHealth = this.monsterHealth - damage;

      this.logGamePlay('you', 'attacked', damage);
      this.attackPlayer();
      this.incrementAttackRound();
    },
    attackPlayer() {
      const damage = getRandomValue(15, 8);
      this.playerHealth = this.playerHealth - damage;

      this.logGamePlay('monster', 'attacked', damage);
    },
    healPlayer() {
      const health = getRandomValue(15, 8);

      if (this.playerHealth + health > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + health;
      }

      this.logGamePlay('you', 'healed', health);
      this.attackPlayer();
      this.incrementAttackRound();
    },
    incrementAttackRound() {
      this.attackRound = this.attackRound + 1;
    },
    logGamePlay(who, what, value) {
      this.gamePlayLog.unshift({
        who,
        what,
        value,
      });
    },
    resetGame() {
      this.attackRound = 0;
      this.gamePlayLog = [];
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.winner = 0;
    },
    specialAttack() {
      const damage = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - damage;

      this.logGamePlay('you', 'special attacked', damage);
      this.attackPlayer();
      this.incrementAttackRound();
    },
    surrenderRound() {
      this.winner = 'Oh no! The Monster Won.';
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
