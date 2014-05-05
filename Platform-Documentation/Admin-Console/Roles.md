<p>Using Roles, an Administrator can control which users have access to application services. A Role can have access to multiple services and applications, but a user can only be assigned to a single Role.</p>
<p>For example, an administrator can create a MongoDB service, and then create a Role that grants a user Read Only access to the MongoDB Service.</p>
<p>An administrator can also grant access to DreamFactory embedded components such as: SQL (DB), Schema, Application Storage, Library Storage, and System (Admin).</p>
<p><b>NOTE:</b> Admin access should be used with caution since granting a standard user with Admin access could be dangerous. For example, a standard user with access to the System / User component could see and modify all other DreamFactory system user accounts.</p>

<b>Configuring Roles</b>
<p>The sample app (<i>Todo Angular</i>) creates a table called todo. An administrator might want to restrict a user to Read Only rights to a table.</p> 
<p>To set this restriction on a user:</p>

<ol>
<li>Access the <b>Admin Console</b> by clicking the gear icon in the upper-right tool bar.</li>
<li>Select <b>Roles</b> from the left-side menu.</li>
<li>Click the <b>Create New Role</b> button.</li>
<li>Enter a name in the <b>Name</b> field.</li>
<li>Enter a description in the <b>Description</b> field.</li>
<li>Select the <b>Users Assigned to this Role</b> from the listed users.</li>
<li>Select the <b>Apps Assigned to this Role</b> from the listed applications.</li>
<li>Under Service select Database, under Component select <b>todo</b>, then select <b>Read Only</b> as the Access Level.</li>
<li>Click the <b>Add Service</b> button.</li>
<li>Click the <b>Save</b> button at the bottom of the screen.</li>
</ol> 

<p>When the user who is assigned to this role signs into DreamFactory, they will have Read Only rights to the table todo, and they will be unable to create new records in this table.</p>
