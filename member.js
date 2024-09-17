function skillsMember()
{
    var member = {
        name: 'John Doe',
        skills: ['JavaScript', 'HTML', 'CSS'],
        age: 25,
        showSkills: function () {
            this.skills.forEach(function (skill) {
                console.log(this.name + ' knows ' + skill);
            });
        }
    };

    member.showSkills();
}