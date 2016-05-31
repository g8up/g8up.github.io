// tutorial: http://facebook.github.io/react/docs/tutorial.html

"use strict";

var Snippet = new React.createClass({
	render: function render() {
		return React.createElement(
			"div",
			{ className: "item" },
			React.createElement(
				"h2",
				{ className: "script-title" },
				React.createElement("a", { name: "baidu-share" }),
				this.props.data.title,
				React.createElement("a", { href: "#baidu-share", className: "anchor" })
			),
			React.createElement(
				"div",
				{ className: "desc" },
				this.props.data.desc
			),
			React.createElement(
				"div",
				{ className: "fav" },
				React.createElement(
					"a",
					{ href: this.props.data.href, className: "bookmark" },
					this.props.data.buttonTxt
				)
			)
		);
	}
});

var List = new React.createClass({
	render: function render() {
		var id = 0;
		var list = this.props.data.map(function (snippet) {
			return React.createElement(
				"li",
				{ key: id++ },
				React.createElement(Snippet, { data: snippet })
			);
		});
		return React.createElement(
			"div",
			{ className: "container" },
			React.createElement(
				"h1",
				{ className: "page-title" },
				"Sigma的常用按钮"
			),
			React.createElement(
				"ul",
				{ className: "script-list" },
				list
			),
			React.createElement(
				"div",
				{ className: "footer" },
				React.createElement(
					"cite",
					null,
					React.createElement(
						"a",
						{ href: "http://g8up.cn" },
						"Sigma"
					)
				)
			)
		);
	}
});

ReactDOM.render(React.createElement(List, { data: ScriptSnippets }), document.querySelector('#sigma'));