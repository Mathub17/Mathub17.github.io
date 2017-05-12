d3.json("data/Kategorien.json", function (data) {

    var category = d3.select("#category")

    category.selectAll("li")
        .data(data)
        .enter()
        .append("li")
        .each(function (d, i) {
            if (i === 0) {
                d3.select(this).attr("class", "active");
            }
        })
        .attr("id", function (d) {
            return d.category;
        })
        .append("a")
        .attr("href", "#")
        .text(function (d) {
            return d.category_text
        });
});


function displayquestions(selected_category) {

    d3.json("data/Fragen.json", function (data) {

        var selected_questions = [];

        for (var x = 0; x < data.length; x++) {

            if (data[x].category == selected_category) {

                selected_questions.push(data[x]);
            }
        };

        var rand = Math.round(Math.random() * selected_questions.length)

        var questions = d3.select("#questions")

        questions.selectAll("a")
            .data(selected_questions)
            .enter()
            .append("a")
            .attr("href", "#")
            .attr("class", "list-group-item")
            .attr("id", function (d) {
                return d.ID_question;
            })
            .each(function (d, i) {
                if (i === rand) {
                    d3.select(this).classed("active", true);
                    // initial visualisation
                    visualization(d3.select(this).attr("id"));
                }
            })
            .text(function (d) {
                return d.question
            });
    });
};


$(document).ready(function () {

    displayquestions($("#category .active").attr('id'));

    $("#category li").on("click", function () {
        $("#category li").removeClass("active");
        $(this).addClass("active");
        $("#chart").empty();
        $("#questions").empty();
        $('#check').prop('checked', true);
        $('#radio').prop('checked', false);
        displayquestions($("#category .active").attr('id'));
    });

    $("#questions").on("click", "a", function () {
        $("#questions a").attr("class", "list-group-item");
        $(this).attr("class", "list-group-item active");
        $("#chart").empty();
        $('#check').prop('checked', true);
        $('#radio').prop('checked', false);
        visualization($(this).attr("id"))
    });
});
