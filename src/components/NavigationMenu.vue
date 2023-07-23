<template>
  <div class="navigation">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/work">Work Experience</router-link>
      <router-link to="/education">Education</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
      <a v-if="isLoggedIn" @click='logout'>Logout</a>
      <a @click='resetDatabase'>Reset Database</a>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'NavigationMenu',
  emits: ['resetStarted', 'resetCompleted'],
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    resetDatabase() {
      this.$emit('resetStarted')
      this.$http.delete("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/home-page.json").then(() => {
        this.$http.delete("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/about-page.json").then(() => {
          this.$http.delete("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json").then(() => {
            this.$http.delete("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json").then(() => {
              this.$http.delete("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects.json").then(() => {
                this.resetHomepage()
              })
            })
          })
        })
      })

      // this.resetAboutPage()
      // this.resetWorkExperience()
      // this.resetEducation()
      // this.resetProjects()
    },
//   .then(() => {
//
// })
    resetHomepage: function () {

      this.$http.put("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/home-page.json", {
        header: "Hello! I'm Mihkel.",
        shortDescription: 'An aspiring developer, still in development.<br> Vue.js | HTML | CSS | Java | Spring Boot | PostgreSQL | IntelliJ',
      }).then(() => {
        this.resetAboutPage()
      })
    },
    resetAboutPage: function () {

      this.$http.put("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/about-view.json", {
        header: 'Pleased to meet you',
        longDescription: 'I am an aspiring developer with prior experience in maritime industry as a Navigation Officer and in aviation industry as an Aircraft Mechanic. <br> I have recently decided to make another 180° turn and become a developer. I have passed a VALI-IT/CHOOSE-IT bootcamp where in 6 weeks I got basic programming knowledge. <br>I am now in search of a Internship or a Junior Developer position where I can put my skills into practice and continue developing myself and become a valuable member of the team.<br>Meanwhile I am trying to keep learning by myself, not to forget what I learned and to improve myself. The website, you are on right now, is a fruit of my work. The site is still in developement. Functionality is there, but looks needs improvement. I\'m now in progress of passing CSS online course and I will try to update this site daily. To see the latest code, check out Github on the right or Projects on the left. <br>At the moment this site is running on Google Firebase back-end, but as soon as I am finished I will start building backend for it myself.',
      }).then(() => {
        this.resetWorkExperience()
      })

    },
    resetWorkExperience: function () {

      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json", {
        companyName: 'Magnetic MRO',
        location: 'Tallinn, Estonia',
        positions: [{
          positionName: 'Aircraft Mechanic',
          startDate: '2020-04-14',
          endDate: '2022-12-31',
          description: 'Maintenance of aircraft in accordance with maintenance manuals. Filling out maintenance documentation. Inspections and replacement of parts.',
        }]
      }).then(() => {
        this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json", {
          companyName: 'Zodiac Maritime Ltd.',
          location: 'Worldwide',
          positions: [{
            positionName: '3rd Navigation Officer',
            startDate: '2017-10-01',
            endDate: '2020-02-01',
            description: 'Navigation watch. Inspection and maintenance of lifesaving appliance and firefighting equipment. Filling out port documents and declarations. Supervising cargo operations. Maintaining ship security.',
          }, {
            positionName: 'Deck Cadet',
            startDate: '2015-11-01',
            endDate: '2016-06-06',
            description: 'Learning officer work under supervision. Deck work - chipping and painting, mooring and anchor operations, cleaning cargo holds, etc.',
          }]
        }).then(() => {
          this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/work-experience.json", {
            companyName: 'Reyktal AS',
            location: 'North Atlantic & Arctic Ocean',
            positions: [{
              positionName: 'Deck Cadet',
              startDate: '2015-01-03',
              endDate: '2015-04-20',
              description: 'Navigation & Port watch. Working in ship factory - processing fish.',
            }]
          }).then(() => {
            this.resetEducation()
          })
        })
      })


    },
    resetEducation: function () {

      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json", {
        institution: 'Udemy',
        location: 'Online',
        subjects: [
          {
            subject: 'CSS - The Complete Guide 2023 (incl. Flexbox, Grid & Sass)',
            degree: 'Online Course',
            startDate: '2023-07-11',
            endDate: '',
            description: 'https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/',

          },
          {
            subject: 'Vue - The Complete Guide (incl. Router & Composition API)',
            degree: 'Online Course',
            startDate: '2023-06-27',
            endDate: '2023-07-17',
            description: 'https://www.udemy.com/course/vuejs-2-the-complete-guide/',

          }]
      }).then(() => {
        this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json", {
          institution: 'BCS Koolitus',
          location: 'Tallinn, Estonia',
          subjects: [{
            subject: 'ChooseIT!',
            degree: 'Retraining',
            startDate: '2023-06-27',
            endDate: '2023-07-17',
            description: '240 hour bootcamp, where I got basic web development knowledge. During training Java, PostgreSQL, RESTful API, Spring Boot, HTML5, CSS, CSS Bootsrap, JavaScript, Vue.js. technologies were used.',

          }]
        }).then(() => {
          this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json", {
            institution: 'Estonian Aviation Academy',
            location: 'Tallinn, Estonia',
            subjects: [{
              subject: 'Aircraft Maintenance Technician',
              degree: 'Vocational Education',
              startDate: '2020-04-13',
              endDate: '2022-01-17',
              description: 'Learning how to fix planes. Theoretical training in classroom and practical training was work at Magnetic MRO.',

            }]
          }).then(() => {
            this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json", {
              institution: 'Estonian Maritime Academy',
              location: 'Tallinn, Estonia',
              subjects: [{
                subject: 'Navigation',
                degree: 'Higher Vocational Education',
                startDate: '2010-09-01',
                endDate: '2017-06-17',
                description: 'Navigation, Ship Manoeuvring and Handling, Training on Simulator, English, Safety of Navigation, Ship Design and Stability ',

              }]
            }).then(() => {
              this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/education.json", {
                institution: 'Tallinn Technical High School',
                location: 'Tallinn Estonia',
                subjects: [{
                  subject: 'Grades 10 to 12',
                  degree: 'Secondary Education',
                  startDate: '2007-09-01',
                  endDate: '2010-06-18',
                  description: 'Secondary education. ',

                }]
              }).then(() => {
                this.resetProjects()
              })
            })
          })
        })
      })
    },


resetProjects: function () {

  this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects.json", {
    projectName: 'CV Front - New',
    projectLink: 'https://github.com/LadvikM/cv_front_new',
    projectDescription: 'It is this website you are on right now. This project I made to introduce myself for potential employers and show what I can do using Vue.js. Still in progress.',
  }).then(() => {
    this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects.json", {
      projectName: 'Escape From the Woods',
      projectLink: 'https://github.com/LadvikM/EscapeFromTheWoods',
      projectDescription: 'Task was to read the map from a file and find shortest way out of "forest" by using Java. Test assignment, was completed successfully.',
    }).then(() => {
      this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects.json", {
        projectName: 'Payday',
        projectLink: 'https://github.com/LadvikM/Payday',
        projectDescription: 'Task was to input a year and then for every month to calculate payday(10th) and date when to send memo for accountant(3days before payday). Taking into consideration that these days can not be on weekend or on holidays. Test assignment, was completed successfully.',
      }).then(() => {
        this.$http.post("https://cv-database-2e255-default-rtdb.europe-west1.firebasedatabase.app/projects.json", {
          projectName: 'Random Emoji',
          projectLink: 'https://github.com/LadvikM/RandomEmoji',
          projectDescription: 'Project for a friend to show my skills. His reaction: "Not bad." The task was to fetch three random emojis from API and print them out in console and test the code.'
        }).then(() => {
          this.$store.dispatch('setAlert', {
            alertMessage: 'Database reset completed',
            isSuccess: true,
          })
        })
      })
    })
  })
},

logout()
{
  this.$store.dispatch('logout');
}
},
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap');

html {

}


nav a {
  font-weight: bold;
  color: white;
  font-size: x-large;
  text-decoration: none;
  display: block;
  cursor: pointer;
  padding: 5px;


}

nav a:hover {
  color: #b8c480;
}

nav a.router-link-exact-active {
  color: #fc9f5b; /*  Active link color*/

}


.navigation {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-family: 'Lato', sans-serif;


}


</style>