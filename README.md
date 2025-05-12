1 - RUN NPM INSTALL 
2 - RUN NPM SERVE 


Notes to consider 
1 - THE POC has be handed to me in a PDF not Figma , Take a very long time to replicate in code as I needed to check most of the things in Pixels 
2 - THE POC was Missing some important points  
2.1 - In the list Employee the sort was Missing I didn't implement it as it was not requried 
2.2 - In the list employee the pagination was missing the Next and Previous I implemented it while it was required in the PDF 
2.3 - View Employee Profile Doesn't have anything to move away from the form . I added the Button Cancel to cover that . it should Back
2.4 - Displaying the Content in Text is horrible experince for the user as the eyes 
2.5 - No Information about how to export and how the customer will select the format. 
2.6 - Create Employee Page doesn't have any photo on how we will enter the custody Data , what happened when I click add Line button just table which is not helping. as well as Update Employee 
3 - THE POC have so Many unnessery Items as well 
3.1 - In the List employee the favoruite Icon was present with no function associated I Ignored it
3.2 - The Side Menu was present and not functional (I Ignored it)
3.3 - The Export was in different format and no Photo to show how I will ask the user to choose which format to choose from I applied only one format. 
3.4 - (The exported data should reflect current filters or the full list if no filters are applied.) This requirment is fundmentally wrong I strongly recommend not to do that in any application. 
3.5 - Ignored the PDF and EXCEL export as it is POC 
3.6 - The Create Employee has a horible UX issue where the Employee Code and Age as presented as Text. this is not a good looking UX.  I replaced it with disabled inputs 
3.7 Custody Code was Marked as required while it is auto Generated.

becuase most of the time wasted in splitting the PDF and trying to duplicated it in code few things are missing 

1 - Major Code refactor for the models We should Have Requests , Responses and Models ,  
2 - Replace the static Table in the list employee with a component . while the result won't be smaller in size as Tailwind formatting is a lot
3 - Sort by Employee Code 
4 - Tests around Componenets 
5 - NrJX

