import Alloy from '/alloy';
import _ from '/alloy/underscore'

<%= modelJs %>

export const Model = Alloy.M('<%= basename %>',
	definition,
	[<%= migrations %>]
);

export const Collection = Alloy.C('<%= basename %>',
	definition,
	Model
);
