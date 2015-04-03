function Loot() {}

Loot.prototype.Schema =
	"<a:help>Specifies the loot credited when this entity is killed.</a:help>" +
	"<a:example>" +
		"<xp>35</xp>" +
		"<metal>10</metal>" +
	"</a:example>" +
	"<oneOrMore>" +
		"<element a:help='A resource or xp amount to be credited'>" +
			"<anyName/>" +
			"<data type='nonNegativeInteger'/>" +
		"</element>" +
	"</oneOrMore>";

Loot.prototype.Serialize = null; // we have no dynamic state to save

Loot.prototype.GetXp = function()
{
	return +(this.template.xp || 0);
};

Loot.prototype.GetResources = function()
{
	var ret = {};
	for (let res of Resources.GetCodes())
		ret[res] = +(this.template[res] || 0);
	
	return ret;
};

Engine.RegisterComponentType(IID_Loot, "Loot", Loot);
